import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

//Schema
const validationShema = Yup.object().shape({
    email: Yup.string()
})

export default function login() {
  return (
    <View>
      <Text>login</Text>
    </View>
  )
}

const styles = StyleSheet.create({})