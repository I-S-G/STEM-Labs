import { globalStyles } from "@/styles/globalStyles";
import { Link } from "expo-router";
import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/input";
import DefaultButton from "@/components/buttons/defaultButton";
import { loginSchema, LoginForm } from "@/schemas/login.schema";
import { authStyles } from "@/styles/authStyles";
import { signInWithEmail } from "@/utils/firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { user } = await signInWithEmail(data.email, data.password);
    alert(JSON.stringify(user));
  };

  return (
    <SafeAreaView style={globalStyles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={globalStyles.title}>STEMM LABS</Text>

        <View style={authStyles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                style={authStyles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
          />

          {errors.email && (
            <Text style={globalStyles.error}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                style={authStyles.input}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
          />

          {errors.password && (
            <Text style={globalStyles.error}>{errors.password.message}</Text>
          )}

          <DefaultButton
            title="Login"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
        </View>

        <Link href="/signup">
          <Text style={authStyles.signupLink}>Signup Instead</Text>
        </Link>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
