import React from "react"
import { Container } from "react-bootstrap"

import { useContentSection } from "../../../../hooks/pageHooks/aboutUsPage/useContentSection"
import ContentBox from "../../../common/ContentBox/ContentBox"

const ContentSection = () => {
  const { contentSection } = useContentSection()

  return (
    <Container>
      <ContentBox content={contentSection} />
    </Container>
  )
}

export default ContentSection
