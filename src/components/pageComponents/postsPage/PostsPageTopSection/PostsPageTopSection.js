/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React from "react"
import { navigate } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import Select from "react-select"

import TopImage from "../../../../assets/images/png/posts_top.png"
import { useCategories } from "../../../../hooks/common/Posts/useCategories"
import BackButton from "../../../common/BackButton/BackButton"
import PageTitle from "../../../common/PageTitle/PageTitle"
import "./PostsPageTopSection.scss"

const PostsPageTopSection = ({
  title,
  selectedCategory,
  hasCategorySelection,
  hasBackButton,
}) => {
  const categories = useCategories()

  const categoriesOptions = categories.map(category => {
    const item = {
      value: category.uri,
      label: category.name,
    }
    if (category.subItems.length) {
      item.options = category.subItems.map(subCategory => {
        return {
          value: subCategory.uri,
          label: subCategory.name,
          parentName: category.name,
        }
      })
    }
    return item
  })

  return (
    <div className="posts-page-top-section">
      <Container>
        <Row>
          <Col md={6} className="order-md-2">
            <img
              src={TopImage}
              className="top-image"
              alt="mbc studOra system"
            />
          </Col>
          <Col md={6} className="order-md-1">
            {hasBackButton && (
              <BackButton backToUrl="/posts" noBorder>
                Inapoi
              </BackButton>
            )}
            <PageTitle title={title} />
          </Col>
        </Row>

        {hasCategorySelection && (
          <Select
            placeholder="Selecteaza categoria"
            classNamePrefix="mbc"
            className="category-select"
            options={categoriesOptions}
            isSearchable={false}
            defaultValue={selectedCategory}
            components={{
              SingleValue: ({ data: { parentName, label } }) => (
                <div className="mbc__single-value css-qc6sy-singleValue">
                  {parentName && (
                    <>
                      <span
                        style={{
                          color: "#a30015",
                          fontSize: "1.4rem",
                          fontWeight: "bold",
                          textOverflow: "clip",
                        }}
                      >
                        {parentName}
                      </span>
                      <br />
                    </>
                  )}
                  {label}
                </div>
              ),
            }}
            onChange={({ value }) => navigate(value)}
          />
        )}
      </Container>
    </div>
  )
}

export default PostsPageTopSection
