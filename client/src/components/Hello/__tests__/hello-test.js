import React from "react"
import renderer from "react-test-renderer"

import Hello from "../"

it("renders Hello default correctly", () => {
  const tree = renderer.create(<Hello />).toJSON()
  expect(tree).toMatchSnapshot()
})
