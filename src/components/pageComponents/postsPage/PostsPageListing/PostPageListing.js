import React from "react"
import PropTypes from "prop-types"
import { uniqueId } from "lodash"
import { Row } from "react-bootstrap"

import PostPageListingItem from "./components/PostsPageListingItem/PostsPageListingItem"
import "./PostsPageListing.scss"

const PostPageListing = ({ data }) => {
  return (
    <section className="mbc-posts-listing">
      <hr size="1" className="divider" />
      <Row>
        {data &&
          data.map(post => (
            <PostPageListingItem postData={post} key={uniqueId("bl_isr_")} />
          ))}
        {!data ||
          (data.length === 0 && (
            <div className="mbc-posts-listing__no-posts">
              <h2 style={{ fontSize: "2.2rem" }} className="mt-5">
                Nu am gasit articole sau postari
              </h2>
              <p>Incearca sa schimbi categorie sau criteriul de cautare</p>
            </div>
          ))}
      </Row>
    </section>
  )
}

PostPageListing.defaultProps = {
  data: [],
}

PostPageListing.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default PostPageListing
