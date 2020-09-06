import { Component } from "react";

export class BaseComponent<p = {}, S = {}> extends Component<
  P & BaseProps,
  S
> {}