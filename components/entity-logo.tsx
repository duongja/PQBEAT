/* eslint-disable @next/next/no-img-element */
import { Icon } from "@/components/icon";

type EntityLogoProps = {
  slug: string;
  name: string;
  size?: "md" | "lg";
};

type LogoItem = {
  src: string;
  label: string;
  imageClassName?: string;
};

type LogoConfig =
  | {
      kind: "single";
      item: LogoItem;
    }
  | {
      kind: "pair";
      items: [LogoItem, LogoItem];
    };

const entityLogoMap: Record<string, LogoConfig> = {
  "ethereum-execution": {
    kind: "single",
    item: { src: "/entity-logos/ethereum.svg", label: "Ethereum" },
  },
  "ethereum-validators": {
    kind: "single",
    item: { src: "/entity-logos/ethereum.svg", label: "Ethereum" },
  },
  "arbitrum-one": {
    kind: "single",
    item: { src: "/entity-logos/arbitrum.svg", label: "Arbitrum" },
  },
  "op-mainnet": {
    kind: "single",
    item: { src: "/entity-logos/optimism.svg", label: "Optimism" },
  },
  base: {
    kind: "single",
    item: { src: "/entity-logos/base.svg", label: "Base" },
  },
  scroll: {
    kind: "single",
    item: { src: "/entity-logos/scroll.svg", label: "Scroll" },
  },
  "zksync-era": {
    kind: "single",
    item: { src: "/entity-logos/zksync.svg", label: "zkSync" },
  },
  "safe-smart-accounts": {
    kind: "single",
    item: { src: "/entity-logos/safe.ico", label: "Safe" },
  },
  "base-account": {
    kind: "single",
    item: { src: "/entity-logos/base.svg", label: "Base Account" },
  },
  "metamask-wallet": {
    kind: "single",
    item: { src: "/entity-logos/metamask.svg", label: "MetaMask" },
  },
  "metamask-infura-services": {
    kind: "pair",
    items: [
      { src: "/entity-logos/metamask.svg", label: "MetaMask" },
      { src: "/entity-logos/infura.png", label: "Infura" },
    ],
  },
  "alchemy-account-kit": {
    kind: "single",
    item: { src: "/entity-logos/alchemy.svg", label: "Alchemy" },
  },
};

const singleSizeClasses = {
  md: "h-10 w-10 p-2",
  lg: "h-14 w-14 p-3",
} as const;

const pairFrameClasses = {
  md: "h-10 w-12",
  lg: "h-14 w-[4.25rem]",
} as const;

const pairItemClasses = {
  md: "h-7 w-7 p-1.5",
  lg: "h-10 w-10 p-2",
} as const;

export function EntityLogo({ slug, name, size = "md" }: EntityLogoProps) {
  const config = entityLogoMap[slug];

  if (!config) {
    return (
      <div
        aria-hidden="true"
        className={`flex items-center justify-center border border-outline-variant/20 bg-white text-primary shadow-[0_4px_12px_rgba(27,28,26,0.05)] ${singleSizeClasses[size]}`}
      >
        <Icon name="archive" className={size === "lg" ? "h-6 w-6" : "h-4 w-4"} />
      </div>
    );
  }

  if (config.kind === "pair") {
    return (
      <div aria-hidden="true" className={`flex items-center ${pairFrameClasses[size]}`}>
        {config.items.map((item, index) => (
          <div
            key={`${slug}-${item.label}`}
            className={`flex items-center justify-center overflow-hidden border border-outline-variant/20 bg-white shadow-[0_4px_12px_rgba(27,28,26,0.05)] ${pairItemClasses[size]} ${index === 0 ? "relative z-10" : "-ml-2"}`}
            title={item.label}
          >
            <img
              src={item.src}
              alt=""
              className={`max-h-full max-w-full object-contain ${item.imageClassName ?? ""}`}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center overflow-hidden border border-outline-variant/20 bg-white shadow-[0_4px_12px_rgba(27,28,26,0.05)] ${singleSizeClasses[size]}`}
      title={`${name} logo`}
    >
      <img
        src={config.item.src}
        alt=""
        className={`max-h-full max-w-full object-contain ${config.item.imageClassName ?? ""}`}
      />
    </div>
  );
}
