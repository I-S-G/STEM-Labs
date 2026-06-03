import { View, Text } from "react-native";
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/input";
import DefaultButton from "@/components/buttons/defaultButton";

import { profileSchema, ProfileForm } from "@/schemas/profile.schema";
import { useUserStore } from "@/store/userStore";
import { updateName } from "@/utils/firebase/users";
import { createGlobalStyles } from "@/styles/globalStyles";
import { useTheme } from "@/hooks/useTheme";

export default function EditProfile() {
  const user = useUserStore((s) => s.currentUser);
  const loadUser = useUserStore((s) => s.loadUser);
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
    },
  });

  const onSubmit = async (data: ProfileForm) => {
    try {
      if (!user) return;

      // update Firestore
      await updateName(user.uid, data.firstName);

      // refresh Zustand store
      await loadUser();

      alert("First name updated");
      router.push("/(tabs)/settings");
    } catch (err: any) {
      alert(err.message || "Update failed");
    }
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.title}>Edit First Name</Text>

      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <Input label="First Name" value={value} onChangeText={onChange} />
        )}
      />

      {errors.firstName && (
        <Text style={globalStyles.error}>{errors.firstName.message}</Text>
      )}

      <DefaultButton
        title={isSubmitting ? "Updating..." : "Update"}
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}
