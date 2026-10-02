import { GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export function SocialButtons({ callbackURL = "/onboarding" }: { callbackURL?: string }) {
  return (
    <div className="grid gap-2">
      {GROK_PROVIDERS.map((provider) => (
        <Button
          key={provider.providerId}
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => void signIn(provider.providerId, { callbackURL, errorCallbackURL: "/login" })}
        >
          Continue with {provider.label}
        </Button>
      ))}
    </div>
  );
}
