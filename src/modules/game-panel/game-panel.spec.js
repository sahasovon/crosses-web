import React from 'react';
import { shallow } from 'enzyme';
import GamePanel from "./game-panel";

beforeAll(() => {
    global.fetch = jest.fn();
});

let wrapper;

beforeEach(() => {
    wrapper = shallow(<GamePanel />, { disableLifecycleMethods: true });
});

afterEach(() => {
    wrapper.unmount();
});

it("must render a loading span before api call success", () => {
    expect(wrapper.find("div.col-12.col-md-8.mx-auto").exists()).toBeTruthy();
});
