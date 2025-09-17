import trekking from "@/public/activities/trekking.jpg";
import image1 from "@/public/activities/activity.png";
import sightseeing from "@/public/activities/sightseeing.jpg";
import kayaking from "@/public/activities/kayaking.jpg";

export const adventures = [
  {
    title: "Outdoor activites",
    image: kayaking,
    intro:
      "Discover thrilling outdoor activities around Windermere, beyond the classic lake cruises. Whether you’re after calm paddling or adrenaline-fuelled fun, there’s something for everyone.",
    sections: [
      {
        header: "Kayaking & Water Sports",
        points: [
          "Kayak, canoe, or paddleboard across stunning Windermere.",
          "Beginner-friendly sit-on-top kayaks and taster sessions available.",
          "Guided tours and 'pizza & paddle' experiences for a fun day out.",
          "Family options include pedalos and Canadian canoes.",
        ],
      },
      {
        header: "Ghyll Scrambling Adventures",
        points: [
          "Climb waterfalls, slide down rocks, and splash through mountain streams.",
          "Perfect for all ages – from family scrambles starting at 5+ to epic challenges for thrill-seekers.",
          "Top spots include Stickle Ghyll in Langdale, Church Beck in Coniston, and Stoneycroft Ghyll near Keswick.",
          "All safety gear, wet suits, and guides included – plus free adventure photos!",
        ],
      },
    ],
    closing:
      "Windermere offers the perfect mix of peace and excitement – creating unforgettable memories in the Lake District.",
  },
  {
    title: "Family walks",
    image: image1,
    intro:
      "From gentle lakeside strolls to adventurous mountain hikes, the Lake District offers family walks for all ages and abilities.",
    sections: [
      {
        header: "Easy Family Walks",
        points: [
          "Buttermere Lake Circuit – 1.5-hour flat path with stunning mountain reflections, pushchair-friendly.",
          "Tarn Hows – 45-minute circular walk around a scenic tarn, accessible and family-friendly.",
          "Grizedale Forest Trails – Waymarked woodland paths with sculptures and a visitor centre.",
        ],
      },
      {
        header: "Moderate Family Walks",
        points: [
          "Catbells – 2-3 hour return, gentle climb with incredible views over Derwentwater, great for children 6+.",
          "Loughrigg Fell – Easy climb with flexible routes and spectacular views over Grasmere and Windermere.",
          "Orrest Head – 1-hour steep but short walk from Windermere, rewarding panoramic views.",
        ],
      },
      {
        header: "Longer Family Adventures",
        points: [
          "Helvellyn via Striding Edge – A thrilling ridge walk for adventurous families with older children (12+).",
          "Scafell Pike – England’s highest peak, 6–7 hours, suitable for fit families with teenagers.",
        ],
      },
      {
        header: "Practical Tips",
        points: [
          "Always check weather conditions before setting out.",
          "Carry waterproofs and extra layers.",
          "Pack plenty of snacks and water.",
          "Use OS Maps app for navigation.",
          "Enjoy tea shops near many trailheads for a post-walk treat!",
        ],
      },
    ],
    closing:
      "Whether it’s a short lakeside walk or a mountain adventure, the Lake District makes family memories to last a lifetime.",
  },
  {
    title: "Places of interest",
    image: trekking,
    intro:
      "From charming towns to historic villages, the Lake District around White Cross Bay is filled with culture, nature, and family adventures just a short drive away.",
    sections: [
      {
        header: "Windermere & Bowness (2–3 miles)",
        points: [
          "Bustling hubs with shops, cafes, and boat trips",
          "The World of Beatrix Potter™ attraction",
          "Family fun at Brockhole and Glebe Park",
        ],
      },
      {
        header: "Hawkshead (8 miles)",
        points: [
          "Car-free cobbled streets full of charm",
          "Historic Grammar School & Beatrix Potter Gallery",
          "Close to Grizedale Forest trails and outdoor art",
        ],
      },
      {
        header: "Coniston (12 miles)",
        points: [
          "Brantwood, home of John Ruskin",
          "The Ruskin Museum and Coniston Water cruises",
          "Climb the famous Old Man of Coniston",
        ],
      },
      {
        header: "Grasmere (8 miles)",
        points: [
          "Wordsworth’s Dove Cottage & Museum",
          "Sarah Nelson’s world-famous gingerbread",
          "Peaceful lake and Helm Crag walks",
        ],
      },
      {
        header: "Keswick (15 miles)",
        points: [
          "Adventure capital with outdoor sports",
          "Derwentwater cruises and Catbells hike",
          "Castlerigg Stone Circle and Pencil Museum",
        ],
      },
      {
        header: "National Trust Gems",
        points: [
          "Hill Top – Beatrix Potter’s home",
          "Wray Castle on Windermere",
          "Townend farmhouse in Troutbeck",
          "Fell Foot lakeside park and Sizergh Castle",
        ],
      },
    ],
    tips: [
      "Perfect mix of culture, history, and outdoor fun",
      "Most spots under 30 minutes by car",
      "Great for families, walkers, and history lovers",
    ],
  },
  {
    title: "Cruises & Ferries",
    image: sightseeing,
    intro:
      "Discover Lake Windermere by boat — from scenic public cruises to private charters, ferries, and self-drive adventures.",
    sections: [
      {
        header: "Public Cruises",
        points: [
          "Windermere Lake Cruises: 45 min to 3 hr sailings year-round",
          "Routes include Red (Ambleside to Bowness), Yellow (Bowness to Lakeside), and Circular (45 min)",
          "Freedom of the Lake ticket: unlimited 24-hour travel",
        ],
      },
      {
        header: "Vehicle Ferry",
        points: [
          "10-minute crossing between Bowness and Far Sawrey",
          "Carries cars, bikes, and foot passengers",
          "Blue Badge holders travel free",
        ],
      },
      {
        header: "Self-Drive Hire",
        points: [
          "Electric boats for up to 6 people",
          "Motorboats at Bowness Bay Marina (kids under 16 free)",
          "Rowing boats, kayaks & paddleboards at Brockhole",
        ],
      },
      {
        header: "Private Charters",
        points: [
          "Luxury yachts with catered options",
          "Wakeboarding charters with professional skipper",
          "VIP motorboat tours for families or couples",
        ],
      },
      {
        header: "Combination Tickets",
        points: [
          "Bundle cruises with Lakeland Motor Museum, Lakes Aquarium, or local railway",
        ],
      },
    ],
  },
];
