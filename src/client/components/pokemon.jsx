import React from 'react';
import { Link, withRouter } from 'react-router-dom';


export class Pokemon extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            card: this.props.card ? this.props.card : '',
            description: this.props ? this.props.description : '',
            value: this.props.value ? this.props.value : '',
        };

        this.ok = this.props.ok ? this.props.ok : 'Ok';
    }

    onFormSubmit = async (event) => {
        event.preventDefault();

        const completed = await this.props.okCallback(
            this.state.card,
            this.state.description,
            this.state.value,
            this.props.cardId
        );

        if (completed){
            this.props.history.push('/');
        }else{
            alert('Failed to load ned title');
        }
    };

    onCardChange = (event) => {
        this.setState({ chef: event.target.value });
    };

    onDescriptionChange = (event) => {
        this.setState({ meal: event.target.value });
    };

    onValueChange = (event) => {
        this.setState({ day: event.target.value });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <div className='inputTitle'>Card(s):</div>
                    <input
                        placeholder={'Type the title(s) of this game'}
                        value={this.state.card}
                        onChange={this.onCardChange}
                        className='bookInput'
                        id='gameInputCard'
                    />
                    <div className='inputTitle'>Description:</div>
                    <input
                        placeholder={'Type the description of this title'}
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        className='bookInput'
                        id='gameInputDescription'
                    />
                    <div className='inputTitle'>Value:</div>
                    <input
                        placeholder={'Type the value for this title.'}
                        value={this.state.value}
                        onChange={this.onValueChange}
                        className='gameInputValue'
                    />
                    <button type='submit' className={'btn'} id='pokemonInputBtn'>
                        {this.ok}
                    </button>
                    <Link to={'/'}>
                        <button className={'btn'}>Cancel</button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default withRouter(Pokemon);

