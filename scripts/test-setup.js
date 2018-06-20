// setup file
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

global.fetch = require("jest-fetch-mock");

configure({ adapter: new Adapter() });

global.BASENAME = "/webcompat-metrics-client";
