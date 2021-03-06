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

export const DISH_FRAGMENT = gql`
  fragment DishResults on Dish {
    id
    name
    price
    photo
    description
    options {
      name
      extra
      choices {
        name
        extra
      }
    }
  }
`;

export const ORDER_FRAGMENT = gql`
  fragment OrderResults on Order {
    id
    createdAt
    total
  }
`;

export const DETAIL_ORDER_FRAGMENT = gql`
  fragment DetailOrderResults on Order {
    id
    status
    total
    customer {
      email
      location {
        latitude
        longitude
      }
    }
    driver {
      email
    }
    restaurant {
      name
    }
  }
`;
