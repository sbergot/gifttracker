import * as React from 'react';
import { Subscribe } from "unstated"

import { FilterStore } from "../../stores/filterStore";
import { DropDownField } from '../shared/molecules/DropDownField';
import { allIndividualType, normalStatus } from '../../services/service.referential';
import { ToggleField } from '../shared/molecules/ToggleField';
import { DataStore } from '../../stores/dataStore';

export function FiltersContainer() {
    return <Subscribe
        to={[FilterStore, DataStore]}
    >
        {
            (filterStore: FilterStore, dataStore: DataStore) => {
                return <div className="container grid-lg">
                    {JSON.stringify(filterStore.state)}
                    <div className="columns">
                        <Filters
                            filterStore={filterStore}
                            individuals={dataStore.getContextService().getAllIndividuals()}
                        />
                    </div>
                </div>
            }
        }
    </Subscribe>
}

export class Filters extends React.Component<{ filterStore: FilterStore, individuals: GT.Individual[] }> {
    getField<TV extends GT.FilterVals>(propName: keyof GT.FilterState, label: string): GT.Field<GT.FilterState, TV> {
        return {
            key: propName,
            label,
            value: this.props.filterStore.state[propName] as TV
        }
    }

    onChange = (event: React.FormEvent<HTMLElement>) => {
        const target = (event.target as HTMLInputElement);
        const field = target.name as keyof GT.FilterState;
        const value = target.value;
        this.props.filterStore.updateFilter({ field, value });
    }

    render() {
        return <>
            <div className="column col-3">
                <DropDownField
                    field={this.getField("ownerType", "Owner")}
                    onChange={this.onChange}
                    options={allIndividualType.map((t) => ({ value: t, descr: t }))}
                />
            </div>
            <div className="column col-3">
                <DropDownField
                    field={this.getField("buyerType", "Buyer")}
                    onChange={this.onChange}
                    options={allIndividualType.map((t) => ({ value: t, descr: t }))}
                />
            </div>
            <div className="column col-3">
                <ToggleField<GT.FilterState>
                    field={this.getField("showEmptyIndividuals", "Show empty")}
                    onClick={() => this.props.filterStore.updateFilter({
                        field: "showEmptyIndividuals",
                        value: (!this.props.filterStore.state.showEmptyIndividuals)
                    })}
                />
            </div>
            <div className="column col-3">
                <DropDownField
                    field={this.getField("giftStatus", "Status")}
                    onChange={this.onChange}
                    options={(normalStatus).map((t) => ({ value: t, descr: t }))}
                    emptyDescr={"Any"}
                />
            </div>
            <div className="column col-3">
                <DropDownField
                    field={this.getField("receiverId", "Receiver")}
                    onChange={this.onChange}
                    options={(this.props.individuals).map((i) => ({
                        value: i.id,
                        descr: `${i.firstName} ${i.lastName}`
                    }))}
                    emptyDescr={"Any"}
                />
            </div>
        </>
    }
}