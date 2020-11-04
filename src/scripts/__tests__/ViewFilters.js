import ViewFilters from "../ViewFilters";
import Store from "../Store";

const store = new Store();

it("should verify that the filter hides and shows the correct deals based on the productFilter", () => {
    document.body.innerHTML = `
    <div class="deal" data-provider="1" data-productType="typeA,typeB" style="display: none;">Deal1</div>
    <div class="deal" data-provider="1" data-productType="typeC" style="display: none;">Deal2</div>
    `;

    const fakeDealsElements = document.getElementsByClassName("deal");
    store.state.productFilters.push("typeB");
    
    const viewFilters = new ViewFilters(store);

    Array.from(fakeDealsElements).forEach(fakeElement => {
        const fakeProductAttributes = fakeElement.dataset.producttype.toLowerCase().split(",");
       
        viewFilters.modifyBasedOnProductFilters(fakeProductAttributes, fakeElement)
    })

    expect(fakeDealsElements[0].style.display).toEqual("none");
    expect(fakeDealsElements[1].style.display).toEqual("none");
});

it("should verify that the filter hides and shows the correct deals based both provider and product filters", () => {
    document.body.innerHTML = `
    <div class="deal" data-provider="1" data-productType="typeA,typeB" style="display: none;">Deal1</div>
    <div class="deal" data-provider="1" data-productType="typeC" style="display: none;">Deal2</div>
    `;

    store.state.providerFilter = 2;
    const viewFilters = new ViewFilters(store);
    
    const fakeDealsElements = document.getElementsByClassName("deal");

    Array.from(fakeDealsElements).forEach(fakeElement => {
        const fakeProductAttributes = fakeElement.dataset.producttype.toLowerCase().split(",");
        const fakeProvider =  parseInt(fakeElement.dataset.provider);    
       
        viewFilters.modifyBasedOnBothFilters(fakeProvider, fakeDealsElements, fakeProductAttributes)
    })

    expect(fakeDealsElements[0].style.display).toEqual("none");
    expect(fakeDealsElements[1].style.display).toEqual("none");
});

it("should verify that provider and product attributes both affect the decided outcome", () => {

    document.body.innerHTML = `
    <div class="deal" data-provider="1" data-productType="typeA,typeB" style="display: none;">Deal1</div>
    <div class="deal" data-provider="1" data-productType="typeC" style="display: none;">Deal2</div>
    `;

    const fakeDealsEls = document.getElementsByClassName("deal");
    store.state.productFilters.push("typeB");
    store.state.providerFilter = null;
    
    const viewFilters = new ViewFilters(store);
    viewFilters.modifyDealsVisibility();

    expect(fakeDealsEls[0].style.display).toEqual("none");
    expect(fakeDealsEls[1].style.display).toEqual("none");

    store.state.providerFilter = 2;
    viewFilters.modifyDealsVisibility();
    expect(fakeDealsEls[0].style.display).toEqual("none");
    expect(fakeDealsEls[1].style.display).toEqual("none");
});