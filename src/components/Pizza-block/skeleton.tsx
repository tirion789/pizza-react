import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props: any) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="539" y="148" rx="3" ry="3" width="67" height="11" /> 
    <rect x="524" y="151" rx="3" ry="3" width="140" height="11" /> 
    <rect x="547" y="152" rx="3" ry="3" width="53" height="11" /> 
    <rect x="556" y="154" rx="3" ry="3" width="72" height="11" /> 
    <rect x="567" y="154" rx="3" ry="3" width="37" height="11" /> 
    <rect x="492" y="149" rx="3" ry="3" width="140" height="11" /> 
    <rect x="528" y="149" rx="45" ry="45" width="165" height="11" /> 
    <circle cx="128" cy="125" r="126" /> 
    <rect x="0" y="261" rx="0" ry="0" width="280" height="31" /> 
    <rect x="1" y="311" rx="0" ry="0" width="280" height="158" />
  </ContentLoader>
)

export default Skeleton