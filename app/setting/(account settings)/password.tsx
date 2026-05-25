import { View, Text } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { passwordSchema, PasswordForm } from "@/schemas/password.schema";
import { changePassword } from "@/utils/firebase/users";

import Input from "@/components/input";
import DefaultButton from "@/components/defaultButton";
import { AccountSettingStyles } from "@/styles/settingsStyles";
import { globalStyles } from "@/styles/globalStyles";

export default function Password() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: PasswordForm) => {
    try {
      await changePassword(data.password);

      reset();
      alert("Password updated");

      router.push("/(tabs)/settings");
    } catch (err: any) {
      alert(err.message || "Failed to update password");
    }
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.titleWithHeader}>Change Password</Text>

      <View style={AccountSettingStyles.form}>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="New Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.password && (
          <Text style={globalStyles.error}>{errors.password.message}</Text>
        )}

        <DefaultButton
          title={isSubmitting ? "Updating..." : "Change"}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
