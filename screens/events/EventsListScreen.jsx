import React from 'react'
import { RefreshControl, Text, View, FlatList,TouchableOpacity, ActivityIndicator } from 'react-native'
import {globalStyles} from '../../styles/global'
import debounce from'lodash.debounce';
import Card from '../../shared/Card'
import { styles } from './styles'
import { Button } from 'react-native-paper';



export default ({navigation, refreshing, onRefresh, loadMore, status, events}) => {

  const renderFooter = () => {
    if (status.isLoadingMore)
    return <ActivityIndicator animating size='large'/>
  }

  return (
    <View>
    {status.error? 
        <Text style={globalStyles.titleText}>Failed to load, try again!</Text>
      :
      <FlatList
      keyExtractor={item=>item.id.toString()}
      data={events}
      onEndReached={()=> loadMore()}
      ListFooterComponent={renderFooter()}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={<View style={styles.noResults}><Text>No results found</Text></View>}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({item})=>(
        <TouchableOpacity style={globalStyles.titleText} onPress={debounce(
          () =>
          navigation.push('Event', {eventKey:item.id}), 500,{
            'leading': true,
            'trailing': false
          }
        )}>
          <Card>
            <Text style={globalStyles.titleText}>
              {item.name}
            </Text>
          </Card>
        </TouchableOpacity>
        )}
      />
    }
    </View>
  )
};