
export const mockBundles = [
    {
        id: 1,
        title: "Full Stack Web Development Mastery",
        instructor: "Niche Academy",
        price: 199.99,
        originalPrice: 299.99,
        rating: 4.8,
        reviews: 120,
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        courses: [1, 2, 3], // IDs of included courses
        features: ["3 Courses", "Certificate of Completion", "Lifetime Access"]
    },
    {
        id: 2,
        title: "Data Science Career Path",
        instructor: "Data Pro Institute",
        price: 349.99,
        originalPrice: 499.99,
        rating: 4.9,
        reviews: 85,
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        courses: [4, 5],
        features: ["2 Courses", "Live Mentorship", "Job Assistance"]
    }
];

export const mockLiveClasses = [
    {
        id: 1,
        title: "Advanced React Patterns Workshop",
        instructorId: 101, // Linked to a user/instructor
        instructorName: "Sarah Johnson",
        date: "2024-03-15",
        time: "10:00 AM",
        duration: "2 hours",
        attendees: 45,
        status: "upcoming"
    },
    {
        id: 2,
        title: "Q&A: Breaking into Tech",
        instructorId: 102,
        instructorName: "Dev Academy",
        date: "2024-03-18",
        time: "2:00 PM",
        duration: "1 hour",
        attendees: 120,
        status: "upcoming"
    }
];

export const mockPlans = [
    {
        id: "free",
        name: "Free",
        price: 0,
        features: ["Access to free courses", "Community support"],
        recommended: false
    },
    {
        id: "pro",
        name: "Pro Learner",
        price: 29,
        billing: "/month",
        features: ["unlimited course access", "Certificate of completion", "Priority support"],
        recommended: true
    },
    {
        id: "academy",
        name: "Academy Partner",
        price: 199,
        billing: "/month",
        features: ["Upload unlimited courses", "Platform promotion", "Advanced analytics"],
        recommended: false,
        type: "instructor" // Specific for vendors
    }
];

export const mockUsers = [
    {
        id: 1,
        name: "John Doe",
        role: "student",
        enrolledBundles: [1],
        upcomingClasses: [1]
    },
    {
        id: 101,
        name: "Sarah Johnson",
        role: "instructor",
        subtype: "trainer", // vs 'academy'
        bio: "Senior React Developer with 10 years experience",
        rating: 4.9
    }
];
