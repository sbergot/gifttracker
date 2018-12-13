import * as React from 'react';
import { HotKeys } from 'react-hotkeys';

interface TypeAheadProps<T extends { id: GT.Id }> {
    options: T[];
    selected: T[];
    disabled?: boolean
    displayOption: (option: T) => string;
    removeElt: (id: GT.Id) => void;
    addElt: (id: GT.Id) => void;
}

interface Option {
    label: string;
    id: string;
}

interface TypeaheadState {
    text: string;
    selectedSuggestion: number;
}

export class Typeahead<T extends { id: GT.Id }> extends React.PureComponent<TypeAheadProps<T>, TypeaheadState> {
    constructor(props: TypeAheadProps<T>) {
        super(props);
        this.state = {
            text: "",
            selectedSuggestion: 0
        };
    }

    onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: event.target.value, selectedSuggestion: 0 })
    }

    getSuggestions = () => {
        if (!this.state.text) {
            return [];
        }

        const allOptions = this.props.options.map(o => {
            return {
                label: this.props.displayOption(o),
                id: o.id.toString()
            }
        });
        const lowerText = this.state.text.toLowerCase();
        const selectedMap: Record<GT.Id, T> = {};
        this.props.selected.forEach((v) => selectedMap[v.id] = v);
        return allOptions
            .filter(o => o.label.toLowerCase().match(lowerText))
            .filter(o => !(o.id in selectedMap))
            .slice(0, 5);
    }

    render() {
        return <div className="form-autocomplete">
            <HotKeys 
                keyMap={{
                    nextSuggestion: "down",
                    prevSuggestion: "up",
                    pickSuggestion: "right"
                }}
                handlers={{
                    nextSuggestion: () => {
                        console.log("next " + this.state.selectedSuggestion);
                        this.setState(state => ({
                            ...state,
                            selectedSuggestion: state.selectedSuggestion + 1
                        }))
                    },
                    prevSuggestion: () => {
                        this.setState(state => ({
                            ...state,
                            selectedSuggestion: state.selectedSuggestion - 1
                        }))
                    },
                    pickSuggestion: () => {
                        const suggestionId = this.getSuggestions()[this.state.selectedSuggestion].id;
                        this.setState({text: '', selectedSuggestion: 0});
                        this.props.addElt(suggestionId);
                    }
                }}
            >
                <div className={"form-autocomplete-input form-input" + (this.props.disabled ? " disabled" : "")}>
                    {
                        this.props.selected.map((elt) => {
                            return <SelectedElement
                                key={elt.id}
                                option={{
                                    label: this.props.displayOption(elt),
                                    id: elt.id.toString()
                                }}
                                onRemove={(id) => this.props.removeElt(id)} />
                        })
                    }
                    <input
                        className="form-input"
                        type="text"
                        onChange={this.onInputChange}
                        value={this.state.text}
                        disabled={this.props.disabled}
                    />
                </div>
                {
                    this.state.text
                        ? <SuggestionList
                            suggestions={this.getSuggestions()}
                            selected={this.state.selectedSuggestion}
                            onSuggestionClick={(id) => {
                                this.props.addElt(id);
                                this.setState({ text: "", selectedSuggestion: 0 });
                            }} />
                        : null
                }
            </HotKeys>
        </div>
    }
}

interface SelectedElementProps {
    option: Option;
    onRemove: (id: GT.Id) => void;
}

function SelectedElement(props: SelectedElementProps) {
    return <div className="chip">
        {props.option.label}
        <a
            href="#"
            className="btn btn-clear"
            aria-label="Close"
            role="button"
            onClick={() => { props.onRemove(props.option.id) }} />
    </div>
}


interface SuggestionListProps {
    suggestions: Option[];
    selected: number;
    onSuggestionClick: (id: GT.Id) => void;
}

function SuggestionList(props: SuggestionListProps) {
    return <ul className="menu">
        {props.suggestions.map((option, index) => {
            return <li className={`menu-item ${index === props.selected ? 'bg-gray' : ''}`}
                key={option.id}>
                <a
                    href="#"
                    onClick={() => props.onSuggestionClick(option.id.toString())}>
                    <div className="tile tile-centered">
                        {option.label}
                    </div>
                </a>
            </li>
        })}
    </ul>
}