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
      if (this.store.state.productFilters.length !== 0) {
      element.style.display = "none";
      }
      else {
        element.style.display = "block";
      }
      const productAttributes = element.dataset.producttype.replace("Fibre ", "").toLowerCase().split(",");
      const phoneIndex = productAttributes.indexOf("phone");
      productAttributes.splice(phoneIndex, 1);

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

      if (isProductFilterIncluded && this.store.state.productFilters.length === productAttributes.length) {
        element.style.display = "block";
      }

  }

  modifyBasedOnBothFilters(provider, element, productAttributes) {
    const isProviderIncluded = this.store.state.providerFilter === parseInt(provider);
    const isProductFilterIncluded = this.store.state.productFilters.every(attr => productAttributes.includes(attr));
    const lengthMatching = this.store.state.productFilters.length === productAttributes.length;
    const productFiltersExist = this.store.state.productFilters.length > 0;

    if (productFiltersExist) {
      if (isProviderIncluded && isProductFilterIncluded && lengthMatching) {
        element.style.display = "block";
      }
      else if (element.style != undefined){
        element.style.display = "none";
      }
    }
    else {
      if (isProviderIncluded && isProductFilterIncluded) {
        element.style.display = "block";
      }
      else {
        element.style.display = "none";
      }
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
