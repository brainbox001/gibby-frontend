import { useEffect } from "react";
import Footer from "./Footer";

function About() {
    useEffect(() => {
        document.title = 'About Giddy';

    }, []);
    return (
        <>
        <div className="mt-16 mx-10">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
            <p>Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam.</p>

            <p>Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.
                Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque.
                Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat.</p>

            <p>Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi.
                Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci.
                In hac habitasse platea dictumst. Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus.</p>

            <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Nulla facilisi.
                Praesent vitae arcu tempor neque lacinia pretium. Donec dictum metus in sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Ut non enim eleifend felis pretium feugiat. Vivamus vel sapien. Praesent nisl tortor, laoreet eu, dapibus ac, adipiscing vitae, turpis.</p>

        </div>
        <Footer />
        </>
    )
};
export default About;
