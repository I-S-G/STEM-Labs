import DefaultButton from "@/components/buttons/defaultButton";
import Input from "@/components/input";
import { globalStyles } from "@/styles/globalStyles";
import { View, Text } from "react-native";
import { TeamSettingStyles } from "@/styles/settingsStyles";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { teamChangeSchema, TeamChangeForm } from "@/schemas/teamChange.schema";
import { useUserStore } from "@/store/userStore";
import { changeTeam } from "@/utils/firebase/users";
import { router } from "expo-router";

export default function Team() {
  const user = useUserStore((s) => s.currentUser);
  const loadUser = useUserStore((s) => s.loadUser);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TeamChangeForm>({
    resolver: zodResolver(teamChangeSchema),
    defaultValues: {
      teamDiscriminator: "",
    },
  });

  const onSubmit = async (data: TeamChangeForm) => {
    try {
      if (!user) return;

      await changeTeam(user.uid, data.teamDiscriminator);

      await loadUser();

      alert("Team changed successfully");
      router.push("/(tabs)/settings")
    } catch (err: any) {
      alert(err.message || "Failed to change team");
    }
  };

  return (
    <View style={globalStyles.screen}>
      <Text style={globalStyles.titleWithHeader}>Change Team</Text>

      <View style={TeamSettingStyles.form}>
        <Controller
          control={control}
          name="teamDiscriminator"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Team Discriminator"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {errors.teamDiscriminator && (
          <Text style={globalStyles.error}>{errors.teamDiscriminator.message}</Text>
        )}

        <DefaultButton
          title={isSubmitting ? "Changing..." : "Change"}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}
