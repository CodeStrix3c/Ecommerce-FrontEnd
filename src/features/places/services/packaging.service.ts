import PackInstance from "@/api/client/packagingInstance";


export const getPackagingOptions  =async ()=>  {
  try {
    const response = await PackInstance.get(
      `/api/packaging-packs`,
    
    );

    return response.data.map((item) => ({
      packagingId: item.packagingId,
      id: item.id,
      name: item.name,
      price: item.price,
      ribbonColor: item.ribbonColor,
      image: item.imageUrl,
      texture: item.textureUrl,
      accentColor: item.accentColor,
      occasion: item.occasion,
      createdAt: item.createdAt,
    }));
  } catch (error) {
    console.error("Error fetching packaging options:", error);
    throw error;
  }
};