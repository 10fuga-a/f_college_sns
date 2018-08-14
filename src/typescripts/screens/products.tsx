import * as React from 'react';
import { ProductService } from '../services';
import { RouteComponentProps } from 'react-router-dom';
import Screen from './screen';
import {Product} from '../entities';

interface Props extends RouteComponentProps<{}> {

}

interface State {
    products: Product[];
}

export class Products extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            products: [],
        };
    }

    public async componentDidMount() {
        const products = await ProductService.getAll();
        this.setState({products});
    }

    public render() {
        const products = this.state.products.map( p => {
            const owner = p.owner;
            console.log(p);
            console.log(owner);
            return (
                <div key={p.id} className='product'>
                    <p className='concept'>{p.concept}</p>
                    <p className='owner'>{owner.name}</p>
                    <p>{owner.subject}</p>
                    <img src={owner.profilePhoto} width='100' height='100'/>
                </div>
            );
        });

        return (
            <Screen name='products'>
                <h1 className='title'>
                    Productの紹介
                </h1>
                <div className='products_index'>
                    {products}
                </div>
            </Screen>
        );
    }
}