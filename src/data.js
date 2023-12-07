export default {
  properties: [
    {
      type: "rent",
      id: 1,
      name: "Property 1",
      description: "Description test",
      squareMeters: 70,
      floors: 1,
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      wifi: false,
      kitchen: true,
      tv: true,
      elevator: false,
      fridge: true,
      diningTable: true,
      waterService: true,
      electricService: false,
      price: 10000.00,
      currency: "usd",
      multimedia: [
        {
          title: 'Image 1',
          type: "video",
          url: "/local-or-utube",
          propertyId: 1,
          base64: '',
          date: new Date('2019-01-01'),
        }
      ],
    },
    {
      type: "sale",
      id: 2,
      name: "Property 2",
      description: "Description test",
      squareMeters: 70,
      floors: 1,
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      kitchen: true,
      waterService: true,
      electricService: true,
      price: 10000.00,
      currency: "usd",
      multimedia: [
        {
          type: "video",
          url: "/local-or-utube"
        }
      ],
      // deleteAt: "12/05/2023"
    },
  ],
  sales: [
    {
      id: 1,
      propertyId: 2,
      price: 10000.00,
      currency: "usd",
      property: []
    }
  ],
  rents: [
    {
      id: 1,
      propertyId: 1,
      price: 10000.00,
      currency: "usd",
      property: []
    }
  ],
  user: {
    id: 1,
    name: "Renny Luzardo",
    role: "admin"
  }
}