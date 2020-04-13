import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from "react-native";
import { Button } from "react-native-paper";
import { globalStyles } from "../../styles/global";
import { Formik } from "formik";
import { FlatButton } from "../../shared/Button";
import { Platform } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import convertDate from '../../helpers/convertDate'
import ItemModal from './components/ItemModal'

const minModal = 'minimum-participants';
const cateModal = 'category';
const dateModal = 'date';

let minimumParticipants;
let category;

export default ({ submitForm, categories, nums, reviewSchema }) => {

  const [visibility, setVisability] = useState("");
  const [selectedDate, setSelectedDate] = useState("Select Time");

  const showModal = (a) => {
    setVisability(a);
  }

  const hideModal = () => {
    setVisability("")
  }

  const handleConfirm = (setFieldValue, date) => {
    const dateToStore = date;
    const dateToDisplay = convertDate(date);
    hideModal(dateModal);
    setFieldValue("startTime", dateToStore);
    setSelectedDate(dateToDisplay);
  };
  const resetDate = () => {
    setSelectedDate("Select Time");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{
            name: "",
            minimumParticipants: "",
            location: {
              lat: 333,
              lng: 444
            },
            address: "My house",
            startTime: "",
            category: ""
          }}
          validationSchema={reviewSchema}
          onSubmit={(values, actions) => {
            // console.log("values: ", values)
            resetDate();
            submitForm(values, actions);
          }}
        >
          {props => {
            return (
              //Event name
              <View>
                <TextInput
                  style={globalStyles.input}
                  placeholder="Event Name"
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                  onBlur={props.handleBlur("name")}
                />
                <Text style={globalStyles.errorText}>
                  {props.touched.name && props.errors.name}
                </Text>

              {/* Minimum People */}
                <ItemModal 
                  formikPropValue={props.values.minimumParticipants}
                  visibility={visibility}
                  showModal={showModal}
                  hideModal={hideModal}
                  modalValue={minModal}
                  constant={minimumParticipants}
                  setValue={props.setFieldValue}
                  field={'minimumParticipants'}
                  title='Minimun Participants'
                  data={nums}
                />

                <Text style={globalStyles.errorText}>
                  {props.touched.minimumParticipants &&
                    props.errors.minimumParticipants}
                </Text>

                {/* Category */}

                <ItemModal 
                  formikPropValue={props.values.category}
                  visibility={visibility}
                  showModal={showModal}
                  hideModal={hideModal}
                  modalValue={cateModal}
                  constant={category}
                  setValue={props.setFieldValue}
                  field={'category'}
                  title='Category'
                  data={categories}
                />

                <Text style={globalStyles.errorText}>
                  {props.touched.category && props.errors.category}
                </Text>

                {/* DATE */}
                <View style={{ ...globalStyles.input, padding: 4 }}>
                  <Button onPress={()=>showModal(dateModal)}>{selectedDate}</Button>
                  <DateTimePickerModal
                    isVisible={visibility==dateModal}
                    mode="datetime"
                    onConfirm={date => {
                      console.log("confirmed")
                      handleConfirm(props.setFieldValue, date);
                    }}
                    onCancel={()=>hideModal()}
                  />
                </View>

                <Text style={globalStyles.errorText}>
                  {props.touched.startTime && props.errors.startTime}
                </Text>


                <View style={styles.submitButton}>
                  <FlatButton text="submit" onPress={props.handleSubmit} />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center"
  },
  wheelPicker: {
    width: 200,
    height: 150
  },
  submitButton: {
    marginTop: 40
  }
});

                {/* <TextInput
                number
                style={globalStyles.input}
                placeholder="Minimum Participants"
                onChangeText={props.handleChange("minimumParticipants")}
                value={props.values.minimumParticipants}
                keyboardType='numeric'
                onBlur={props.handleBlur("minimumParticipants")}
              /> */}
