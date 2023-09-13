import camelCase from "lodash-es/camelCase";

const modules: any = import.meta.glob("./*/index.ts", { eager: true });

export const buildInPlugins = Object.keys(modules).reduce(
  (res: any, key: string) => {
    const name = camelCase(key.replace("./", "").split("/")[0]);
    res[name] = modules[key].default;
    return res;
  },
  {}
);
