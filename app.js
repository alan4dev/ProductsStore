// DOM Objects
const productForm = document.getElementById('product-form')
const productList = document.getElementById('product-list')

// Product class
class Product {
  constructor(name, price, year) {
    this.name = name
    this.price = price
    this.year = year
  }
}

// User Interface class
class UI {
  addProduct(product) {
    const el = document.createElement('div')
    el.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong>Product</strong>: ${product.name}
          <strong>Price</strong>: ${product.price}
          <strong>Year</strong>: ${product.year}
          <button class="btn btn-outline-danger" name="delete">Delete</button>
        </div>
      </div>
    `

    productList.appendChild(el)
    this.resetForm()
    this.showMessage('Product added successfully', 'success', 'check-circle')
  }

  resetForm() {
    productForm.reset()
  }

  deleteProduct(el) {
    if(el.name === 'delete') {
      el.parentElement.parentElement.parentElement.remove()
      this.showMessage('Product deleted successfully', 'warning', 'minus-circle')
    }
  }

  showMessage(message, css, icon) {
    const el = document.createElement('div')
    el.className = `alert alert-${css} mt-3`
    el.appendChild(document.createTextNode(message))
    el.innerHTML += ` <i class="fas fa-${icon} fa-lg"></i>`

    const container = document.querySelector('.container')
    const app = document.querySelector('#app')
    container.insertBefore(el, app)

    setTimeout(() => {
      el.remove()
    }, 3000)
  }
}

// Default Product
const ui = new UI()
const dp = new Product('Burritos Don Wicho', 11.34, 2018)
ui.addProduct(dp)

// DOM Events
productForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = document.getElementById('name').value
  const price = document.getElementById('price').value
  const year = document.getElementById('year').value
  
  if(name === '' || price === '') {
    return ui.showMessage('Complete fields please', 'danger', 'flushed')
  }

  const product = new Product(name, price, year)
  ui.addProduct(product)
})

productList.addEventListener('click', (e) => {
  ui.deleteProduct(e.target)
}) 
