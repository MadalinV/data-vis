import React, {  Fragment } from "react";
import mockData from "./mockData";
import Histogram from "./Histogram";


const months = {
	Jan: 1,
	Feb: 2,
	Mar: 3,
	Apr: 4,
	May: 5,
	Jun: 6,
	Jul: 7,
	Aug: 8,
	Sep: 9,
	Oct: 10,
	Nov: 11,
	Dec: 12,
};

let postsByMonth = {};
let posts = mockData.data.allPosts;
posts.forEach(post => {
	let month = post.createdAt.split(" ")[1];
	let year = post.createdAt.split(" ")[3];
	if (year === "2019") {
		if (!postsByMonth[month]) {
			postsByMonth[month] = [post];
		} else {
			postsByMonth[month].push(post);
		}
	}
});
let postsByMonthSorted = Object.keys(postsByMonth)
	.map(month => ({ month, posts: postsByMonth[month] }))
	.sort((a, b) => months[a.month] - months[b.month]);

export default function App() {
	
		return (
			<Fragment>
				<div
					style={{
						width: "100%",
						minHeight: "100vh",
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<h1>Number of Posts per month</h1>
					<Histogram
						data={postsByMonthSorted}
						width={1000}
						height={600}
					/>
				</div>
			</Fragment>
		);
	
}
