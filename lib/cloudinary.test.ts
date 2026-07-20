import { afterEach, describe, expect, it } from "vitest";
import { cloudinaryFetchUrl, isCloudinaryConfigured } from "@/lib/cloudinary";

const ORIGINAL_ENV = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

afterEach(() => {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = ORIGINAL_ENV;
});

describe("isCloudinaryConfigured", () => {
  it("is false when the cloud name isn't set", () => {
    delete process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    expect(isCloudinaryConfigured()).toBe(false);
  });

  it("is true once the cloud name is set", () => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "demo";
    expect(isCloudinaryConfigured()).toBe(true);
  });
});

describe("cloudinaryFetchUrl", () => {
  it("builds a fetch URL with the cloud name, transforms, and an encoded source URL", () => {
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = "demo";
    const url = cloudinaryFetchUrl("https://images.unsplash.com/photo-123", {
      width: 800,
      height: 600,
    });

    expect(url).toBe(
      "https://res.cloudinary.com/demo/image/fetch/f_auto,q_auto,c_fill,w_800,h_600/https%3A%2F%2Fimages.unsplash.com%2Fphoto-123"
    );
  });
});
