import _ from 'lodash';
import React, { useState } from 'react';
import { WhenNotVoid } from 'shared/utils/type-utils';
import styled from 'styled-components';

import { useStores } from 'src/hooks/use-stores';
import useErnie from 'shared/hooks/use-ernie';
import { ReactSelect, Tooltip } from 'shared/components';
import brandsForDropdown from 'shared/graphql/brand/queries/brands-for-dropdown.gql';
import { SuperAdminContent } from 'src/components/super-admin-content';
import { Flex } from 'rebass';

import createDispensaryBrand from 'src/components/brand-select/create-dispensary-brand.gql';
import {
  GqlBrandFragmentForDropdownFragment,
  GqlBrandsForDropdownQuery,
  GqlBrandsForDropdownQueryVariables,
  GqlCreateDispensaryBrandMutation,
  GqlCreateDispensaryBrandMutationVariables,
} from 'types/graphql';

type MiniBrand = WhenNotVoid<WhenNotVoid<GqlCreateDispensaryBrandMutation>['createBrandV2']>;
export type ChangeResult = { key: string; label: string; value: MiniBrand };
type BrandSelectProps = {
  allowCreation?: boolean;
  brand?: Brand | null;
  disabledBrandIds?: string[];
  id?: string;
  onChange: (item: ChangeResult | null) => unknown;
  placeholder: string;
  height?: number;
  width?: number;
};
type Result = {
  key: string;
  label: string;
  value: Brand;
  isDisabled: boolean;
};

type Brand = GqlBrandFragmentForDropdownFragment & {
  isGlobal: boolean;
};

export type BrandOption = {
  key: string;
  label: string;
  isDisabled: boolean;
  value: Brand;
};

const isBrand = (value: any): value is Brand => value?.__typename === 'Brand';
const tooltipCopy = 'This is a dispensary-local brand. This product will not show up in brand-related search results.';

export default function BrandSelect(props: BrandSelectProps): JSX.Element {
  const { allowCreation = false, brand, disabledBrandIds, id, onChange, placeholder, height = 45, width = 300 } = props;
  const [results, setResults] = useState<Result[] | null>(null);

  const { apolloClient, UI } = useStores();
  const showErnie = useErnie();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (value: ChangeResult | null): void => {
    onChange(value);
  };

  const handleSearchBrands = async (search: string): Promise<Brand[] | null> => {
    try {
      const { data, error } = await apolloClient.query<GqlBrandsForDropdownQuery, GqlBrandsForDropdownQueryVariables>({
        query: brandsForDropdown,
        fetchPolicy: 'no-cache',
        variables: {
          dispensaryId: UI.dispensary.id,
          searchString: search,
          limit: 20,
        },
      });

      if (error) {
        throw error;
      } else {
        return data.searchBrandsV2?.brands.filter<Brand>(isBrand) ?? null;
      }
    } catch (error) {
      console.error(error);
      showErnie('There was an error getting brands. Please contact support.', 'danger');
      return null;
    }
  };

  async function handleLoadOptions(searchStr: string): Promise<BrandOption[]> {
    const brands = (await handleSearchBrands(searchStr)) ?? [];
    const values = brands.map((b) => ({
      key: b._id,
      label: b.name,
      value: b,
      isDisabled: disabledBrandIds?.includes(b._id) ?? false,
    }));

    setResults(values);
    return values;
  }

  const noOptionsMessage = ({ inputValue }: { inputValue: string }): string => {
    if (inputValue.length > 0) {
      return 'No brands match your search.';
    }
    return 'Begin typing to search brands';
  };

  let selectedBrand;
  let isLocalBrand = false;

  if (brand) {
    isLocalBrand = !!(brand.id && !brand.isGlobal);

    selectedBrand = {
      key: brand._id,
      value: brand._id,
      label: brand.name,
    };
  }

  async function handleCreate(inputValue: string): Promise<void> {
    setIsLoading(true);

    try {
      const dispensaryId = UI.dispensary.id;
      if (!dispensaryId) {
        throw new Error('No dispensaryId available');
      }

      const response = await apolloClient.mutate<
        GqlCreateDispensaryBrandMutation,
        GqlCreateDispensaryBrandMutationVariables
      >({
        mutation: createDispensaryBrand,
        fetchPolicy: 'no-cache',
        variables: {
          name: inputValue,
          dispensaryId,
        },
      });

      if (!response.data?.createBrandV2) {
        throw response.error ?? new Error('No data returned from createDispensaryBrand');
      }

      const newBrand = response.data.createBrandV2;
      const selectedOption: ChangeResult = {
        key: newBrand.id,
        label: newBrand.name,
        value: newBrand,
      };

      onChange(selectedOption);
      showErnie(`${newBrand.name} has been successfully added to your list of brands!`, 'success');
    } catch (e) {
      console.error(e);
      showErnie('There was an error getting brands. Please contact support.', 'danger');
    }

    setIsLoading(false);
  }

  const asyncParams = allowCreation
    ? {
        isAsyncCreatable: true,
        isLoading,
        onCreateOption: handleCreate,
      }
    : {
        isAsync: true,
        noOptionsMessage,
      };

  function handleFormatCreateLabel(inputValue: string): JSX.Element {
    if (_.isEmpty(results)) {
      return (
        <AddBrandText>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          No brands match {inputValue}. <a>Add it</a>
        </AddBrandText>
      );
    }

    return (
      <AddBrandText>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        Don't see this brand? <a>Add it</a>
      </AddBrandText>
    );
  }

  return (
    <Flex>
      <ReactSelect
        formatCreateLabel={handleFormatCreateLabel}
        isClearable
        loadOptions={handleLoadOptions}
        onChange={handleChange}
        placeholder={placeholder}
        value={selectedBrand}
        width={width}
        height={height}
        textAlign='left'
        id={id}
        {...asyncParams}
      />
      {isLocalBrand && (
        <SuperAdminContent>
          <Flex alignItems='center' ml='10px'>
            <Tooltip ml='-6px' tooltipCopy={tooltipCopy} icon={{ src: '/icons/question-mark-green.svg' }} />
            <LocalBrandSpan>Local Brand</LocalBrandSpan>
          </Flex>
        </SuperAdminContent>
      )}
    </Flex>
  );
}

const AddBrandText = styled.span`
  :hover a {
    text-decoration: underline;
  }
`;

export const LocalBrandSpan = styled.span`
  font-size: 13px;
  font-weight: bold;
  line-height: 1.38;
  padding-left: 10px;
  width: 107px;
  color: #4ca667;
`;
