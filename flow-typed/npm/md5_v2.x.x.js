// flow-typed signature: f8b238d223e91a9ce75549c747d57a89
// flow-typed version: 3a188dce72/md5_v2.x.x/flow_>=v0.25.x

// @flow

declare module "md5" {
  declare module.exports: (
    message: string | Buffer,
    options?: {
      asString?: boolean,
      asBytes?: boolean,
      encoding?: string
    }
  ) => string;
}
