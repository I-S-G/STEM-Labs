import { globalStyles } from "@/styles/globalStyles";
import { router, Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/input";
import DefaultButton from "@/components/defaultButton";
import { loginSchema, LoginForm } from "@/schemas/login.schema";




export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit:SubmitHandler<LoginForm> = async (data) => {
    alert(JSON.stringify(data));
    router.push("/");
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>STEMM LABS</Text>

      <View style={styles.form}>
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

        <DefaultButton
          title="Login"
          onPress={handleSubmit(onSubmit)}
        />
      </View>

      <Link href="/signup">
        <Text style={styles.signupLink}>
          Signup Instead
        </Text>
      </Link>
    </View>
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

  input: {
    marginBottom: 15,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
});