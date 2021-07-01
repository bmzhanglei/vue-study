export default {
  functional: true,
  render: (h, ctx) => {
    ctx.props.var1 = "xxx"
    return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {});
  }
};
