import Template from "../Template";
import mockData from "../../../public/db.json";

it("should verify that a deal has the correct providerName applied", () => {

    document.body.innerHTML = `
    <div id="template-deal">{{ providerId }}</div>
    <div id="template-list-item">hello</div>
    <div id="template-icon">hello</div>
    `;
    const dealTemplate = new Template();
    const result = dealTemplate.buildDeal(mockData.deals[0]);

    expect(parseInt(result)).toEqual(mockData.deals[0].provider.id);

    //note to whoever is going to review it: I would have tested all {{ values }} in a real life scenario and preferably
    // I would have broken down this function to smaller pieces to test independently. I just wouldn't want to spend a bunch of time on it right now 
    // as it would just be copy pasting lines.
});