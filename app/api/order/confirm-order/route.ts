import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body)
  const { form, searchParams } = body;

  const fromDate = searchParams.dates.from;
  const toDate = searchParams.dates.to;

  const checkIn = new Date(fromDate).toISOString().split("T")[0];
  const checkOut = new Date(toDate).toISOString().split("T")[0];

  console.log(searchParams.lodge.refNo)

  const reqBody = {
    data: {
      attributes: {
        check_in: `${checkIn}`,
        check_out: `${checkOut}`,
        guest_name: `${form.firstName} ${form.lastName}`,
        guest_email: `${form.email}`,
        guest_phone: `${form.phone}`,
        number_of_guests: 3,
      },
      relationship: {
        property: {
          data: {
            type: "properties",
            id: `${searchParams.lodge.refNo}`,
          },
        },
      },
    },
  };


  return NextResponse.json({
    message: "user registered successfully",
    status: 201,
    ok: true,
  });
}

// {
//     "data": {
//         "attributes": {
//             "check_in": "2025-09-24",
//             "check_out": "2025-09-29",
//             "guest_name": "Test Booking",
//             "guest_email": "jon@example.com",
//             "guest_phone": "+001122334455",
//             "number_of_guests": 3
//         },
//         "relationships": {
//             "property": {
//                 "data": {
//                     "type": "properties",
//                     "id": "192931"
//                 }
//             }
//         }
//     }
// }

// {
//     "data": {
//         "id": "7674770",
//         "type": "bookings",
//         "attributes": {
//             "check_in": "2025-09-24",
//             "check_out": "2025-09-29",
//             "guest_name": "Test Booking",
//             "guest_email": "jon@example.com",
//             "guest_phone": "+001122334455",
//             "number_of_guests": 3
//         },
//         "relationships": {
//             "property": {
//                 "data": {
//                     "id": "192931",
//                     "type": "properties"
//                 }
//             }
//         }
//     }
// }
