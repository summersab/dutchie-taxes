import React, { forwardRef } from 'react';
import map from 'lodash/map';
import uri from 'lil-uri';
import Imgix from 'react-imgix';
import { replaceAWSSourceWithImgix } from '../helpers/imgix';

export default forwardRef(({ src, ...props }, ref) => {
  src = replaceAWSSourceWithImgix(src);
  return <Imgix ref={ref} src={src} {...props} />;
});

/**
 *  The Imgix component from react-imgix works really well
 *  in most situations, but when the content may be portrait,
 *  landscape, or square, and not always have the same height
 *  or width dependent on orientation, there may be undesired
 *  width or height results since the width/height props are
 *  applied to the img tag directly.
 *
 *  This component builds the Imgix image URL to set all the
 *  desired Imgix properties (passed as imgixParams), and
 *  builds srcSet for proper scaling.
 *
 *  The component was designed to work with Imgix `fit: clip`,
 *  but should work for other fit properties as well.
 *
 *  @param {string} src - image src
 *  @param {Object} imgixParams - any values to be added as
 *  Imgix query params (see https://docs.imgix.com/apis/url)
 */
export const ManualImgix = ({ src, imgixParams, alt }) => {
  src = replaceAWSSourceWithImgix(src);
  const imgixUrl = uri(src).query(imgixParams).build();

  // Build srcset for scaling as react-imgix component would
  const srcSetParams = {
    '1x': { q: 75, dpr: 1 },
    '2x': { q: 50, dpr: 2 },
    '3x': { q: 35, dpr: 3 },
    '4x': { q: 23, dpr: 4 },
    '5x': { q: 20, dpr: 5 },
  };
  const srcUri = uri(imgixUrl);
  const srcSet = map(
    srcSetParams,
    (value, key) => `${srcUri.query({ ...srcUri.query(), ...value }).build()} ${key}`
  ).join(', ');

  return <img src={imgixUrl} srcSet={srcSet} alt={alt} />;
};
