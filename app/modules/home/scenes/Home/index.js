import React from 'react'
import {View,Text,FlatList, RefreshControl, ActivityIndicator,StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import NewsItem from "../../components/NewsItem"

import {actions as home} from "../../index"
import styles from '../../components/NewsItem/styles'

const {getNewsHeadlines} = home;

 class Home extends React.Component {

    state = {
        refreshing: false
    }

    componentDidMount() {
        this.getNewsHeadlines(false)
    }

    getNewsHeadlines= (refreshing = true) => {
        this.setState({refreshing});
        this.props.getNewsHeadlines()
         .finally(() => this.setState({refreshing: false}))
    }

    renderItem = ({item, index}) => {
        return <NewsItem article={item}/>
    }



    render() {
        const {articles, isFetching, hasError, errorMsg} = this.props; 

        if (isFetching) return <ActivityIndicator/>
        else {
            return (
                <View style= {styles.container}>
                <FlatList
                    style={{backgroundColor:'#eaeaea'}}
                    contentContainerStyle={{paddingVertical:5,}}
                    ref='listRef'
                    data={articles}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    initialNumToRender={5}
                    keyExtractor={(item,index) => index.toString()+"_home"}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.getNewsHeadlines}
                        />
                    }/>
                    </View>
            );
        }

    }

}
const styling=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

function mapStateToProps(state,props) {
    return {
        isFetching: state.homeReducer.isFetching,
        hasError: state.homeReducer.hasError,
        errorMsg: state.homeReducer.errorMsg,
        articles: state.homeReducer.articles
    }
}
export default connect(mapStateToProps, {getNewsHeadlines})(Home);