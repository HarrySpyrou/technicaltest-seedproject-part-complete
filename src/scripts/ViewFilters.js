class ViewFilters {
  constructor(store) {
    this.store = store;
    this.productFilters = Array.from(
      document.getElementsByClassName("js-filter-product")
    );
    this.providerFilters = Array.from(
      document.getElementsByClassName("js-filter-provider")
    );
    this.onProductFilterChange = this.onProductFilterChange.bind(this);
    this.onProviderFilterChange = this.onProviderFilterChange.bind(this);
    this.addFilterEventHandlers();
  }

  //adds event listeners to filters on the left
  addFilterEventHandlers() {
    
    //it's three filters 'broadband, tv, mobile'
    if (this.productFilters.length) {
      this.productFilters.forEach(element => {
        element.addEventListener("change", this.onProductFilterChange);
      });
    }

    //remaining filters underneath
    if (this.providerFilters.length) {
      this.providerFilters.forEach(element => {
        element.addEventListener("change", this.onProviderFilterChange);
      });
    }
  }

  removeFilterEventHandlers() {
    if (this.productFilters.length) {
      this.productFilters.forEach(element => {
        element.removeEventListener("change", this.onProductFilterChange);
      });
    }
    if (this.providerFilters.length) {
      this.providerFilters.forEach(element => {
        element.removeEventListener("change", this.onProviderFilterChange);
      });
    }
  }

  //save filter change on checking/unchecking to store
  onProductFilterChange(event) {
    this.store.setProductFilter(event.target.value);
    this.modifyDealsVisibility()
  }

  onProviderFilterChange(event) {
    const value = parseInt(event.target.value, 10)
    this.providerFilters.forEach(element => (element.checked = false));
    if (this.store.state.providerFilter === value) {
      this.store.setProviderFilter();
    } else {
      this.store.setProviderFilter(value);
      event.target.checked = true;
    }

    this.modifyDealsVisibility()
  }

  modifyDealsVisibility() {
    const dealsElements = document.getElementsByClassName("deal");
    Array.from(dealsElements).forEach(element => {
      element.style.display = "none";

      const productAttributes = element.dataset.producttype.replace("Fibre ", "").toLowerCase().split(",");
      const provider =  parseInt(element.dataset.provider);

      if (this.store.state.providerFilter == null) {
        this.modifyBasedOnProductFilters(productAttributes, element);
      }
      else {
        this.modifyBasedOnBothFilters(provider, element, productAttributes);
      }
    })
  }

  modifyBasedOnProductFilters(productAttributes, element) {
    const lowerProductFilters = this.store.state.productFilters.map((item) => {
      return item.toLowerCase();
    });;
    const isProductFilterIncluded = lowerProductFilters.every(attr => productAttributes.includes(attr));

    if (isProductFilterIncluded) {
      element.style.display = "block";
    }
  }

  modifyBasedOnBothFilters(provider, element, productAttributes) {
    const isProviderIncluded = this.store.state.providerFilter === parseInt(provider);
    const isProductFilterIncluded = this.store.state.productFilters.every(attr => productAttributes.includes(attr));

    if (isProviderIncluded && isProductFilterIncluded) {
      element.style.display = "block";
    }
  }

  update(state) {
    if (state.deals.length) {
      this.providerFilters.forEach(element => {
        element.hasAttribute("disabled") && element.removeAttribute("disabled");
      });
      this.productFilters.forEach(
        element =>
          element.hasAttribute("disabled") &&
          element.removeAttribute("disabled")
      );
    } else {
      this.providerFilters.forEach(
        element =>
          !element.hasAttribute("disabled") &&
          element.setAttribute("disabled", "disabled")
      );
      this.productFilters.forEach(
        element =>
          !element.hasAttribute("disabled") &&
          element.setAttribute("disabled", "disabled")
      );
    }
  }
}

export default ViewFilters;
