import React from 'react';
import ReactDom from 'react-dom';

class ShopItem extends React.Component {
	clickDel(){
		this.props.delItem(this.props.index);
	}
	render() {
		return (
			<tr>
				<td><a href={"http://localhost/topic.js?gid="+this.props.value.gid} onClick={this.clickDel.bind(this)} >{this.props.value.name}</a></td>
				<td>{this.props.value.tid}</td>
				<td></td>
				<td><button onClick={this.clickDel.bind(this)}>刪除</button></td>
			</tr>
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			sample: ''
		};
		this.testClick = this.testClick.bind(this);
	}

	componentDidMount(){
		fetch("index.php").then(res => res.json()).then(res =>{this.setState({items:res})})
	}
	
	testClick() {
		const data = this.state.items;
		data.push(this.state.sample);
		this.setState( {items:data , sample:''} );
	}
	
	delItem(index){
		const data = this.state.items;
		data.splice(index)
		this.setState( {items:data} );
	}

	render() {
		return (
			<div>
				<input type="text" value={this.state.sample}
					onChange={event=>this.setState({sample:event.target.value})}/>
				<button onClick={this.testClick}>按鈕</button>
				<table>
					<tbody>
					<tr>
						<td><a href="sign_in.html">登入</a></td>
						<td><a href="sign_up.html">註冊</a></td>
					</tr>
					</tbody>
				</table>
				<table border="1">
					<tbody>
						{this.state.items.map( (aa,idx) => (
							<ShopItem value={aa} index={idx} delItem={this.delItem.bind(this)} />
						))}
					</tbody>
				</table>
			</div>
		)
	}
}

ReactDom.render( <App />, document.getElementById('root') );