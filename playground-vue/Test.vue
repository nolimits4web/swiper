<script>
export default {
  render() {
    console.log(this);
    return this.$slots.default();
  },
};
</script>
