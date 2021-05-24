import gql from "graphql-tag";

export const RESTAURANT_FRAGMENT = gql`
  fragment RestaurantResults on Restaurant {
    id
    name
    coverImg
    category {
      name
    }
    address
    isPromoted
  }
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryResults on Category {
    id
    name
    coverImg
    slug
    restaurantCount
  }
`;
