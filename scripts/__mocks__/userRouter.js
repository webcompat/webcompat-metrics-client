import * as nextRouter from "next/router"; // eslint-disable-line import/no-namespace

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: "/" }));
