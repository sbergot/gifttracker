import { Container } from "unstated";

export class FilterStore extends Container<GT.FilterState> {
    state: GT.FilterState = {
        buyerType: "Any",
        giftStatus: null,
        receiverId: null,
        ownerType: "Any",
        showEmptyIndividuals: true
    }

    public updateFilter(update: GT.FilterUpdate) {
        this.setState({ [update.field]: update.value })
    }
}