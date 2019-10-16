import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { GameInfo } from "../Game/GameInProgress/GameInfo/GameInfo";
Enzyme.configure({ adapter: new Adapter() });

describe("GameInfo component", () => {
  beforeEach(() => {});
  it("Should match snapshot", () => {
    const wrapper = shallow(<GameInfo />);
    expect(wrapper).toMatchSnapshot();
  });
});
