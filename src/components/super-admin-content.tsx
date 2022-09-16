import React from 'react';
import styled from 'styled-components';
import { display, width } from 'styled-system';
import { useUser } from 'src/hooks/use-user';

type ApplyStyleToChildrenProps = {
  children: React.ReactElement<{ className?: string }>;
  className?: string;
};
function ApplyStyleToChildren({ children, className }: ApplyStyleToChildrenProps): JSX.Element {
  return React.cloneElement(React.Children.only(children), {
    className: `${children.props.className ?? ''} ${className ?? ''}`.trim(),
  });
}

const StyledContent = styled(ApplyStyleToChildren)<{ retainColor?: boolean }>`
  color: ${(props) => !props.retainColor && '#61a58b !important'}};
  * {
    color: ${(props) => !props.retainColor && '#61a58b !important'};

    .tooltip-copy {
      color: ${(props) => !props.retainColor && '#f5f7fa !important'};
    }
  }
  ${display}
  ${width}
`;

type SuperAdminContentProps = {
  children: React.ReactElement<{ className?: string }>;
  retainColor?: boolean;
};

export function SuperAdminContent({
  children,
  retainColor,
  ...remainingProps
}: SuperAdminContentProps): JSX.Element | null {
  const user = useUser();

  if (!user.isSuperAdmin) {
    return null;
  }

  if (String(children.type) === 'Symbol(react.fragment)') {
    console.log(
      'Styles cannot be applied to a React.Fragment. Check',
      (children as any)._owner?.elementType?.displayName,
      children
    );
  }

  return <StyledContent children={children} retainColor={retainColor} {...remainingProps} />;
}
