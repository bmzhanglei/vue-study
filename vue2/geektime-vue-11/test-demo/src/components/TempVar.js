export default {
  functional: true,
  render: (h, ctx) => {
  let val =  ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {})
  console.log(val)
    return val;
  }
};