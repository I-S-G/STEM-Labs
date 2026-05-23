import { globalStyles } from "@/styles/globalStyles";
import { router, Link } from "expo-router";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/input";
import DefaultButton from "@/components/defaultButton";
import { signupSchema, SignupForm } from "@/schemas/signup.schema";
import { useSignupStore } from "@/store/signupStore";



export default function Signup() {

  const { setSignupData } = useSignupStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      retypePassword: "",
    },
  });

  const onSubmit:SubmitHandler<SignupForm> = (data) => {
    setSignupData(data);
    alert(JSON.stringify(data));
    router.push("/teamSignup");
  };

  return (
    <ScrollView style={globalStyles.screen}>
      <Text style={globalStyles.title}>STEMM LABS</Text>

      <View style={styles.form}>
        <Text style={styles.subheading}>
          Personal Details
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Name"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {errors.name && (
          <Text style={styles.error}>
            {errors.name.message}
          </Text>
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        {errors.email && (
          <Text style={styles.error}>
            {errors.email.message}
          </Text>
        )}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />

        {errors.password && (
          <Text style={styles.error}>
            {errors.password.message}
          </Text>
        )}

        <Controller
          control={control}
          name="retypePassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Retype Password"
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />

        {errors.retypePassword && (
          <Text style={styles.error}>
            {errors.retypePassword.message}
          </Text>
        )}

        <DefaultButton
          title="Next"
          style={{ marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Link href="/login">
        <Text style={styles.signupLink}>
          Login Instead
        </Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
    marginBottom: 40,
  },

  signupLink: {
    textAlign: "center",
    color: "#ea00ff",
    textDecorationLine: "underline",
  },

  subheading: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginBottom: 5,
  },

  input: {
    marginBottom: 15,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
});