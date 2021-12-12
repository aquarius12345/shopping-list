export default function toggleProduct(id) {
  return {
      type: 'TOGGLE_PRODUCT',
      payload: id
  }
}