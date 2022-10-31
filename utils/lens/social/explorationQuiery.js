/**
 * 
 * query ExplorePublications {
  explorePublications(request: {
    sortCriteria: LATEST,
    noRandomize:true,
    sources:["5bba5781-78b5-4927-8d2f-122742817583"],
    publicationTypes: [POST],
    cursor:"{\"timestamp\":1,\"offset\":75}"
  }) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
}



fragment MetadataOutputFields on MetadataOutput {
  media {
    original {
      ...MediaFields
    }
  }

}


fragment PostFields on Post {
  id
  metadata {
    ...MetadataOutputFields
  }
  appId
}





 */