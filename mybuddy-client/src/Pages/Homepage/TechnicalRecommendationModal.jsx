import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import htmlLogo from "../../assets/skill-icons/html.png";
import javascriptLogo from "../../assets/skill-icons/js.png";
import kuberLogo from "../../assets/skill-icons/kuber.png";
import cLanguageLogo from "../../assets/skill-icons/c.png";
import cloudflareLogo from "../../assets/cloud.svg";
import figmaLogo from "../../assets/skill-icons/figma.png";
import swiftLogo from "../../assets/skill-icons/swift.png";
import prismaLogo from "../../assets/skill-icons/prisma.png";
import sanityLogo from "../../assets/skill-icons/sanity.png";
import vuetifyLogo from "../../assets/skill-icons/vuetify.svg";
import angularLogo from "../../assets/skill-icons/angular.svg";
import bootstrapLogo from "../../assets/skill-icons/bootstrap.svg";
import backboeLogo from "../../assets/skill-icons/backbonejs-original-wordmark.svg";
import bulmaLogo from "../../assets/skill-icons/bulma.svg";
import webpackLogo from "../../assets/skill-icons/webpack.svg";
import vueJsLogo from "../../assets/skill-icons/vuejs-original-wordmark.svg";
import pugLogo from "../../assets/skill-icons/pig.svg";
import tsLogo from "../../assets/skill-icons/typescript-original.svg";
import javaLogo from "../../assets/skill-icons/java-original.svg";
import postmanLogo from "../../assets/skill-icons/getpostman-icon.svg";
import bubelLogo from "../../assets/skill-icons/babeljs-icon.svg";
import reduxLogo from "../../assets/skill-icons/redux.svg";
import sassLogo from "../../assets/skill-icons/sass-original.svg";
import gulpLogo from "../../assets/skill-icons/gulp-plain.svg";
import qtLogo from "../../assets/skill-icons/Qt_logo_2016.svg";
import clojureLogo from "../../assets/skill-icons/Clojure_logo.svg";
import svelteLogo from "../../assets/skill-icons/Svelte_Logo.svg";
import haskellLogo from "../../assets/skill-icons/Haskell-Logo.svg";
import reactLogo from "../../assets/skill-icons/react-original-wordmark.svg";
import nimLogo from "../../assets/skill-icons/nim-lang-icon.svg";
import wxWidgetsLogo from "../../assets/skill-icons/wxwidget.svg";
import erlangLogo from "../../assets/skill-icons/erlang-official.svg";
import pythonLogo from "../../assets/skill-icons/python-original.svg";
import scalaLogo from "../../assets/skill-icons/scala-original.svg";
import coffeescriptLogo from "../../assets/skill-icons/coffeescript-original-wordmark.svg";
import materializeLogo from "../../assets/skill-icons/materialize.svg";
import goLogo from "../../assets/skill-icons/go-original 1.svg";
import elixirLogo from "../../assets/skill-icons/elixir-lang-icon.svg";
import tailwindLogo from "../../assets/skill-icons/tailwindcss-icon.svg";
import objetiveLogo from "../../assets/skill-icons/apple_objectivec-icon.svg";
import jasmineLogo from "../../assets/skill-icons/jasmine-icon.svg";
import csharpeLogo from "../../assets/skill-icons/csharp-original 1.svg";
import gtkLogo from "../../assets/skill-icons/GTK_logo 1.svg";
import nuxtjsLogo from "../../assets/skill-icons/nuxtjs-icon.svg";
import androidLogo from "../../assets/skill-icons/android-original-wordmark.svg";
import ngrinxLogo from "../../assets/skill-icons/nginx-original.svg";
import gcpLogo from "../../assets/skill-icons/google_cloud-icon.svg";
import solrLogo from "../../assets/skill-icons/apache_solr-icon.svg";
import springioLogo from "../../assets/skill-icons/springio-icon.svg";
import dockerLogo from "../../assets/skill-icons/docker-original-wordmark.svg";
import graphqlLogo from "../../assets/skill-icons/graphql-icon.svg";
import nodejsLogo from "../../assets/skill-icons/nodejs-original-wordmark.svg";
import canvajsLogo from "../../assets/skill-icons/canvasjs-charts.svg";
import openRestyLogo from "../../assets/skill-icons/open-resty.svg";
import xamarinLogo from "../../assets/skill-icons/xamarin.svg";
import grafanaLogo from "../../assets/skill-icons/grafana-icon.svg";
import rabitmqLogo from "../../assets/skill-icons/rabbitmq-icon.svg";
import nativescriptLogo from "../../assets/skill-icons/nativescript.svg";
import jenkinsLogo from "../../assets/skill-icons/jenkins-icon.svg";
import kafkaLogo from "../../assets/skill-icons/kafka.svg";
import apacheLogo from "../../assets/skill-icons/apache_cordova-icon.svg";
import chartjsLogo from "../../assets/skill-icons/chart.svg";
import pytorchLogo from "../../assets/skill-icons/pytorch-icon.svg";
import hadoopLogo from "../../assets/skill-icons/apache_hadoop-icon.svg";
import elasticSearchLogo from "../../assets/skill-icons/elastic-icon.svg";
import expressLogo from "../../assets/skill-icons/express-original-wordmark.svg";
import tensorFlowLogo from "../../assets/skill-icons/tensorflow-icon.svg";
import scikitLearnLogo from "../../assets/skill-icons/Scikit_learn_logo_small.svg";
import amplifyLogo from "../../assets/skill-icons/amplify.svg";
import flutterioLogo from "../../assets/skill-icons/flutterio-icon.svg";
import iconicLogo from "../../assets/skill-icons/Ionic_Logo.svg";
import flaskLogo from "../../assets/skill-icons/pocoo_flask-icon.svg";
import dartLogo from "../../assets/skill-icons/dartlang-icon.svg";
import opencvLogo from "../../assets/skill-icons/opencv-icon.svg";
import firebaseLogo from "../../assets/skill-icons/firebase-icon.svg";
import couchdbLogo from "../../assets/skill-icons/couchdb-original.svg";
import pandasLogo from "../../assets/skill-icons/pandas-original.svg";
import azureLogo from "../../assets/skill-icons/microsoft_azure-icon.svg";
import cassandraLogo from "../../assets/skill-icons/apache_cassandra-icon.svg";
import karmaLogo from "../../assets/skill-icons/karma.svg";
import middlemanLogo from "../../assets/skill-icons/middleman.svg";
import nextjsLogo from "../../assets/skill-icons/nextjs-2.svg";
import circleciLogo from "../../assets/skill-icons/circleci-icon.svg";
import herokuLogo from "../../assets/skill-icons/heroku-icon.svg";
import realmLogo from "../../assets/skill-icons/realm.svg";
import puppeteerLogo from "../../assets/skill-icons/pptrdev-official.svg";
import seleniumLogo from "../../assets/skill-icons/selenium-logo.svg";
import bashLogo from "../../assets/skill-icons/gnu_bash-icon.svg";
import mysqlLogo from "../../assets/skill-icons/mysql-original-wordmark.svg";
import hiveLogo from "../../assets/skill-icons/hive.svg";
import rustLogo from "../../assets/skill-icons/rust.svg";
import awsLogo from "../../assets/skill-icons/amazonwebservices-original-wordmark.svg";
import mongodbLogo from "../../assets/skill-icons/mongodb-original-wordmark.svg";
import gridsomeLogo from "../../assets/skill-icons/gridsome-icon.svg";
import sketchLogo from "../../assets/skill-icons/sketchapp-icon.svg";
import laravelLogo from "../../assets/skill-icons/laravel.svg";
import veupressLogo from "../../assets/skill-icons/paeckCWC-removebg-preview 1.svg";
import reactNativeLogo from "../../assets/skill-icons/react-native-original-wordmark.svg";
import framerLogo from "../../assets/skill-icons/framer-icon.svg";
import jeky11Logo from "../../assets/skill-icons/jekyllrb-icon.svg";
import djangoLogo from "../../assets/skill-icons/django.svg";
import kibanaLogo from "../../assets/skill-icons/elasticco_kibana-icon.svg";
import mssqlLogo from "../../assets/skill-icons/mssql.svg";
import cockroachdbLogo from "../../assets/skill-icons/cockroachdb.svg";
import hugoLogo from "../../assets/skill-icons/logos-hugo.svg";
import mochaLogo from "../../assets/skill-icons/mochajs-icon.svg";
import sqliteLogo from "../../assets/skill-icons/sqlite-icon.svg";
import dotnetLogo from "../../assets/skill-icons/dot-net-original-wordmark.svg";
import gatsbyLogo from "../../assets/skill-icons/gatsbyjs-icon.svg";
import jestLogo from "../../assets/skill-icons/jestjsio-icon.svg";
import blenderLogo from "../../assets/skill-icons/blender_community_badge_white.svg";
import gitLogo from "../../assets/skill-icons/git-scm-icon.svg";
import electronLogo from "../../assets/skill-icons/electron.svg";
import d3jdLogo from "../../assets/skill-icons/d3js-original.svg";
import quasarLogo from "../../assets/skill-icons/quasar-logo.svg";
import mariadbLogo from "../../assets/skill-icons/mariadb.svg";
import zapierLogo from "../../assets/skill-icons/zapier-icon.svg";
import cypressLogo from "../../assets/skill-icons/cypress.svg";
import appwriteLogo from "../../assets/skill-icons/appwriteio-icon.svg";
import symfonyLogo from "../../assets/skill-icons/symfony_black_03.svg";
import linuxLogo from "../../assets/skill-icons/linux-original.svg";
import photoshopLogo from "../../assets/skill-icons/photoshop-line.svg";
import travisciLogo from "../../assets/skill-icons/travis-ci-icon.svg";
import railsLogo from "../../assets/skill-icons/rails-original-wordmark 1.svg";
import iftttLogo from "../../assets/skill-icons/ifttt-ar21.svg";
import illustratorLogo from "../../assets/skill-icons/adobe_illustrator-icon.svg";
import eleventyLogo from "../../assets/skill-icons/11ty.svg";
import unrealLogo from "../../assets/skill-icons/unreal-engine (1).svg";
import codeigniterLogo from "../../assets/skill-icons/codeigniter.svg";
import postgresqlLogo from "../../assets/skill-icons/postgresql-original-wordmark.svg";
import radisLogo from "../../assets/skill-icons/redis-original-wordmark.svg";
import oracleLogo from "../../assets/skill-icons/oracle.svg";
import unityLogo from "../../assets/skill-icons/unity3d-icon.svg";
import hexoLogo from "../../assets/skill-icons/hexoio-icon.svg";
import sculpinLogo from "../../assets/skill-icons/sculpin.svg";
import scllyLogo from "../../assets/skill-icons/scullyio-icon.svg";
import arduinoLogo from "../../assets/skill-icons/ardunio.svg";
import xdLogo from "../../assets/skill-icons/adobe-xd.svg";
import matlabLogo from "../../assets/skill-icons/Matlab_Logo.svg";
import { useSelector } from "react-redux";

const TechnicalRecommendationModal = ({ isOpen, closeModal, updateTechnicalRecommendations }) => {
  const theme = useSelector((state) => state.theme.theme);
  const [selectedLogos, setSelectedLogos] = useState([]);
  const handleCheckboxChange = (name) => {
    setSelectedLogos((prevSelectedLogos) => {
      const newSelectedLogos = prevSelectedLogos.includes(name)
        ? prevSelectedLogos.filter((logoName) => logoName !== name)
        : [...prevSelectedLogos, name];
      
      updateTechnicalRecommendations(newSelectedLogos);
      return newSelectedLogos;
    });
  };

  const logos = [
    {
      category: "Programming Languages",
      items: [
        {
          name: "JavaScript",
          logo: javascriptLogo,
          bgColor: "#fff3c4",
      lightButton: "#ffca28",
        },
        {
          name: "C++",
          logo: cLanguageLogo,
          bgColor: "#e0ebf6",
      lightButton: "#659ad2",
        },
        {
          name: "CSharpe",
          logo: csharpeLogo,
          bgColor: "#d0cddd",
      lightButton: "#8A4182",
        },
        {
          name: "Go",
          logo: goLogo,
          bgColor: "#d0eafd", lightButton: "#588beb"
        },
        {
          name: "Objective",
          logo: objetiveLogo,
          bgColor: "#fddac2",
      lightButton: "#f88535",
        },
        {
          name: "Elixir",
          logo: elixirLogo,
          bgColor: "#d0cddd",
          lightButton: "#8A4182",
        },
        {
          name: "Rust",
          logo: rustLogo,
          bgColor: "#b8b8b8",
      lightButton: "#000",
        },
        {
          name: "Clojure",
          logo: clojureLogo,
          bgColor: "#b0d3e8",
      lightButton: "#0071b5",
        },

        {
          name: "Haskell",
          logo: haskellLogo,
          bgColor: "#d0cddd",
          lightButton: "#8A4182",
        },

        { name: "Nim", logo: nimLogo,bgColor: "#fff4c6", lightButton: "#FED10A" },
        {
          name: "Erlang",
          logo: erlangLogo,
          bgColor: "#eecdd6",
          lightButton: "#A90533",
        },
        {
          name: "Python",
          logo: pythonLogo,
          bgColor: "#fff4c6",
      lightButton: "#FED10A",
        },
        {
          name: "Scala",
          logo: scalaLogo,
          bgColor: "#fbd4cc",
          lightButton: "#e13b36",
        },
        {
          name: "Coffescript",
          logo: coffeescriptLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Java Original",
          logo: javaLogo,
          bgColor: "#d0eafd",
      lightButton: "#588beb",
        },
        {
          name: "Typescript",
          logo: tsLogo,
          bgColor: "#b0d3e8",
          lightButton: "#0071b5",
        },
      ],
    },
    {
      category: "backendDevelopment",
      items: [
        {
          name: "Solr",
          logo: solrLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Graphql",
          logo: graphqlLogo,
          bgColor: "#f9c9e9",
          lightButton: "#FF4088",
        },
        {
          name: "Nodejs",
          logo: nodejsLogo,
          bgColor: "#c0e8d6",
          lightButton: "#41b883",
        },
        {
          name: "Cloudflare",
          logo: cloudflareLogo,
          bgColor: "#fcd9bc",
          lightButton: "#faad3f",
        },
        {
          name: "Prisma",
          logo: prismaLogo,
          bgColor: "#d9e7fd",
      lightButton: "#4285f4",
        },
        {
          name: "Sanity",
          logo: sanityLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Springio",
          logo: springioLogo,
          bgColor: "#c0e8d6",
          lightButton: "#41b883",
        },

        {
          logo: openRestyLogo,
          name: "Open Resty",
          bgColor: "#e0ffd2",
          lightButton: "#5AA946",
        },
        {
          logo: kafkaLogo,
          name: "kafka",
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Rabbitmq",
          logo: rabitmqLogo,
          bgColor: "#fddac2",
          lightButton: "#f88535",
        },
        {
          name: "Express",
          logo: expressLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Hadoop",
          logo: hadoopLogo,
          bgColor: "#fff4c6",
          lightButton: "#FED10A",
        },
        {
          name: "Ngrinx",
          logo: ngrinxLogo,
          bgColor: "#c0e8d6",
          lightButton: "#41b883"
        },
        {
          name: "Nextjs",
          logo: nextjsLogo,
          bgColor: "#b8b8b8",
      lightButton: "#000",
        },
      ],
    },
    {
      category: "frontendDevelopment",
      items: [
        {
          name: "HTML",
          logo: htmlLogo,
          bgColor: "#ffd7cd",
          lightButton: "#f16529",
        },
        {
          name: "Vue.Js",
          logo: vueJsLogo,
          bgColor: "#c0e8d6",
          lightButton: "#41b883",
        },
        {
          name: "Materialize",
          logo: materializeLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Tailwind",
          logo: tailwindLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "Swift",
          logo: swiftLogo,
          bgColor: "#fddac2",
          lightButton: "#f88535",
        },
        {
          name: "Svelte",
          logo: svelteLogo,
          bgColor: "#fddac2",
          lightButton: "#f88535",
        },
        {
          name: "React",
          logo: reactLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "WX Widgets",
          logo: wxWidgetsLogo,
          bgColor: "#fcdbd7",
      lightButton: "#f37368",
        },
        {
          name: "Webpack", //er  vagrant scikiti
          logo: webpackLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb"
        },

        {
          name: "Babel",
          logo: bubelLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        { name: "GTK", logo: gtkLogo,bgColor: "#fcdbd7", lightButton: "#f37368" },
        {
          name: "Vuetify",
          logo: vuetifyLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "Angular",
          logo: angularLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Bootstrap",
          logo: bootstrapLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Backbone.Js",
          logo: backboeLogo,
          bgColor: "#b0d3e8",
          lightButton: "#0071b5",
        },
        {
          name: "Bulma",
          logo: bulmaLogo,
          bgColor: "#ccf6f0",
      lightButton: "#00D1B2",
        },

        { name: "Pug", logo: pugLogo , bgColor: "#f5dfc6", lightButton: "#56332B"},

        {
          name: "Redux",
          logo: reduxLogo,
          bgColor: "#d0cddd",
          lightButton: "#764ABC",
        },
        {
          name: "Sass",
          logo: sassLogo,
          bgColor: "#eecdd6",
          lightButton: "#CB6699",
        },
        {
          name: "Gulp",
          logo: gulpLogo,
          bgColor: "#fbd4cc",
          lightButton: "#e13b36",
        },
        { name: "QT", logo: qtLogo,bgColor: "#c0e8d6", lightButton: "#41b883" },
      ],
    },

    {
      category: "Mobile App Development",
      items: [
        {
          name: "Android",
          logo: androidLogo,
          bgColor: "#dce9b4",
          lightButton: "#A4C439",
        },
        {
          name: "Flutterio",
          logo: flutterioLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "Dart",
          logo: dartLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "Iconic",
          logo: iconicLogo,
          bgColor: "#b0d3e8",
          lightButton: "#0071b5",
          
        },
        {
          name: "reactNative",
          logo: reactNativeLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Xamarin",
          logo: xamarinLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "Native Script",
          logo: nativescriptLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "Apache Cordova",
          logo: apacheLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
      ],
    },
    {
      category: "AI/ML",
      items: [
        {
          name: "Tensor Flow",
          logo: tensorFlowLogo,
          bgColor: "#fde8d1",
          lightButton: "#F89939",
        },
        {
          name: "Pytorch",
          logo: pytorchLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Pandas",
          logo: pandasLogo,
          bgColor: "#d0cddd",
          lightButton: "#8A4182",
        },
        {
          name: "Opencv",
          logo: opencvLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Scikit Learn",
          logo: scikitLearnLogo,
          bgColor: "#fde8d1",
          lightButton: "#F89939",
        },
      ],
    },
    {
      category: "Database",
      items: [
        {
          name: "Oracle",
          logo: oracleLogo,
          bgColor: "#fcdbd7",
      lightButton: "#f37368",
        },
        {
          name: "Postgresql",
          logo: postgresqlLogo,
          bgColor: "#e5f2fa",
          lightButton: "#336791",
        },
        {
          name: "Redis",
          logo: radisLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Mssql",
          logo: mssqlLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "CockroachDB",
          logo: cockroachdbLogo,
          bgColor: "#e5f2d9",
          lightButton: "#348540",
        },
        {
          name: "Hive",
          logo: hiveLogo,
          bgColor: "#fff4c6",
      lightButton: "#FED10A",
        },
        {
          name: "Cassandra",
          logo: cassandraLogo,
          bgColor: "#d0eafd",
      lightButton: "#588beb",
        },
        {
          name: "Mysql",
          logo: mysqlLogo,
          bgColor: "#ccdfe8",
          lightButton: "#00618A",
        },
        {
          name: "MongoDB",
          logo: mongodbLogo,
          bgColor: "#c0e8d6",
          lightButton: "#41b883",
        },
        {
          name: "CouchDB",
          logo: couchdbLogo,
            bgColor: "#c0e8d6",
      lightButton: "#41b883",
        },
        {
          name: "Realm",
          logo: realmLogo,
          bgColor: "#f9c9e9",
          lightButton: "#FF4088",
        },
        {
          name: "MariaDB",
          logo: mariadbLogo,
          bgColor: "#b8b8b8",
      lightButton: "#000",
        },
        {
          name: "Elastic Search",
          logo: elasticSearchLogo,
          bgColor: "#fff4c6",
          lightButton: "#FED10A",
        },
        {
          name: "Sqlite",
          logo: sqliteLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
      ],
    },
    {
      category: "Data Visualization",
      items: [
        {
          name: "D3js",
          logo: d3jdLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Chartjs",
          logo: chartjsLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Canvajs",
          logo: canvajsLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "kibana",
          logo: kibanaLogo,
          bgColor: "#f9c9e9",
          lightButton: "#FF4088",
        },
        {
          name: "Grafana",
          logo: grafanaLogo,
          bgColor: "#fff4c6",
          lightButton: "#FF9900",
        },
      ],
    },
    {
      category: "Devops",
      items: [
        {
          name: "AWS",
          logo: awsLogo,
          bgColor: "#fff4c6", 
          lightButton: "#FF9900"
        },

        {
          name: "Travisci",
          logo: travisciLogo,
          bgColor: "#f5d6db",
          lightButton: "#CB3349",
        },
        {
          name: "Circleci",
          logo: circleciLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Azure",
          logo: azureLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },

        {
          name: "Bash",
          logo: bashLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Kubernetes",
          logo: kuberLogo,
          bgColor: "#d5e3ff",
          lightButton: "#326de6",
        },
        {
          name: "GCP",
          logo: gcpLogo, bgColor: "#b0d3e8", lightButton: "#0071b5"
        },
        {
          name: "Jenkins",
          logo: jenkinsLogo,
          bgColor: "#fbd4cc",
          lightButton: "#e13b36",
        },
        {
          name: "Docker",
          logo: dockerLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
      ],
    },
    {
      category: "Backend as a Service(BaaS)",
      items: [
        {
          name: "Firebase",
          logo: firebaseLogo,
          bgColor: "#fff4c6",
          lightButton: "#FED10A",
        },
        {
          name: "Amplify",
          logo: amplifyLogo,
          bgColor: "#fff4c6",
          lightButton: "#FED10A",
        },
        {
          name: "Appwrite",
          logo: appwriteLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Heroku",
          logo: herokuLogo,
          bgColor: "#e1e0ed",
      lightButton: "#663399",
        },
      ],
    },
    {
      category: "Framework",
      items: [
        {
          name: "Django",
          logo: djangoLogo,
          bgColor: "#d5eee4",
          lightButton: "#2BA977",
        },
        {
          name: "Laravel",
          logo: laravelLogo,
          bgColor: "#fbd4cc",
          lightButton: "#e13b36",
        },
        {
          name: "Dotnet",
          logo: dotnetLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "Codeigniter",
          logo: codeigniterLogo,
          bgColor: "#fcdbd7",
          lightButton: "#f37368",
        },
        {
          name: "Quasar",
          logo: quasarLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },

        {
          name: "Flask",
          logo: flaskLogo,
          bgColor: "#b8b8b8",
      lightButton: "#000",
        },
        {
          name: "Rails",
          logo: railsLogo,
          bgColor: "#edd5d7",
          lightButton: "#A62C39",
        },
        {
          name: "Symfony",
          logo: symfonyLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Electron",
          logo: electronLogo,
          bgColor: "#dae6e9",
          lightButton: "#47848F",
        },
      ],
    },
    {
      category: "Testing",
      items: [
        {
          name: "Cypress",
          logo: cypressLogo,bgColor: "#b8b8b8",
          lightButton: "#000",

        },
        {
          name: "Puppeteer",
          logo: puppeteerLogo,
          bgColor: "#cdf6ec",
          lightButton: "#04D49F",
        },
        {
          name: "Karma",
          logo: karmaLogo,
          bgColor: "#cdf6ec",
          lightButton: "#56C5A8",
        },
        {
          name: "Selenium",
          logo: seleniumLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Jasmine",
          logo: jasmineLogo,
          bgColor: "#d0cddd",
      lightButton: "#8A4182",
        },
        {
          name: "Jest",
          logo: jestLogo,
          bgColor: "#ebd9dc",
          lightButton: "#99424F",
        },
        {
          name: "Mocha",
          logo: mochaLogo,
          bgColor: "#e8e1da",
          lightButton: "#8D6748",
        },
      ],
    },
    {
      category: "Software",
      items: [
        {
          name: "Illustrator",
          logo: illustratorLogo,
          bgColor: "#ffe0c2",
          lightButton: "#FF7C00",
          
        },
        {
          name: "Photoshop",
          logo: photoshopLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
        {
          name: "Blender",
          logo: blenderLogo,
          bgColor: "#ffe0c2",
          lightButton: "#FF7C00",
        },
        {
          name: "Matlab",
          logo: matlabLogo,
          bgColor: "#f9e9e0",
          lightButton: "#d3590f",
        },
        {
          name: "Postman",
          logo: postmanLogo,
          bgColor: "#fddac2",
          lightButton: "#f88535",
        },
        { name: "XD", logo: xdLogo, bgColor: "#ffd5f3", lightButton: "#ff2bc2" },
        {
          name: "Figma",
          logo: figmaLogo,
          bgColor: "#d9e7fd",
          lightButton: "#2fc1fd",
        },
        {
          name: "Sketch",
          logo: sketchLogo,
          bgColor: "#fff4c6",
          lightButton: "#FDD231",
        },
        {
          name: "Framer",
          logo: framerLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
      ],
    },
    {
      category: "Static Site Generators",
      items: [
        {
          name: "Gatsby",
          logo: gatsbyLogo,
          bgColor: "#e1e0ed",
          lightButton: "#663399",
        },
        {
          name: "Gridsome",
          logo: gridsomeLogo,
          bgColor: "#c0e8d6",
          lightButton: "#41b883",
        },
        {
          name: "Hugo",
          logo: hugoLogo,
          bgColor: "#fcdbd7",
          lightButton: "#FF4088",
        },
        {
          name: "Nuxt.js",
          logo: nuxtjsLogo,
          bgColor: "#56C5A8",
          lightButton: "#56C5A8",
        },
        {
          name: "11ty",
          logo: eleventyLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Sculpin",
          logo: sculpinLogo,
          bgColor: "#eff3f5",
      lightButton: "#83a3b2",
        },
        {
          name: "Vue press",
          logo: veupressLogo,
          bgColor: "#d1eee1",
          lightButton: "#41B783",
        },
        { name: "H", logo: hexoLogo,bgColor: "#d0eafd", lightButton: "#588beb" },
        {
          name: "Middleman",
          logo: middlemanLogo,
          bgColor: "#fbedcc",
          lightButton: "#F1C761",
        },
        {
          name: "Jeky11",
          logo: jeky11Logo,
          bgColor: "#fbd4cc",
          lightButton: "#e13b36",
        },
        {
          name: "Scully",
          logo: scllyLogo,
          bgColor: "#c0e8d6",
          lightButton: "#41b883",
        },
      ],
    },
    {
      category: "Game Engines",
      items: [
        {
          name: "Unity",
          logo: unityLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
        {
          name: "Unreal",
          logo: unrealLogo,
          bgColor: "#b8b8b8",
          lightButton: "#000",
        },
      ],
    },
    {
      category: "Automation",
      items: [
        {
          name: "Zapier",
          logo: zapierLogo,
          bgColor: "#ffdbcc",
      lightButton: "#FF4A00",
        },
        {
          name: "Ifttt",
          logo: iftttLogo,
          bgColor: "#d0eafd",
          lightButton: "#588beb",
        },
      ],
    },
    {
      category: "Other",
      items: [
        {
          name: "Linux",
          logo: linuxLogo,
          bgColor: "#fff5cc",
          lightButton: "#FFD133",
        },
        { name: "Git", logo: gitLogo, bgColor: "#fbd4cc", lightButton: "#e13b36"  },

        {
          name: "Arduino",
          logo: arduinoLogo,
          bgColor: "#def1f2",
          lightButton: "#00979d",
        },
      ],
    },
  ];
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className=" px-[3px] rounded-m bg-white">
                  <div className=" w-full py-5">
                    <div className="flex flex-col justify-center items-center">
                      <p className=" text-xl font-semibold">
                        Selected Technology
                      </p>
                      <div className="w-full px-3">
                        {logos.map((category) => (
                          <div key={category.category} className="py-3 md:py-5 lg:py-7">
                            <p className="py-4 text-lg text-center mg:text-center font-semibold capitalize">
                              {category.category
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-8 pt-3">
                              {category.items.map((item) => (
                                <div
                                  key={item.name}
                                  style={{backgroundColor:item.bgColor}}
                                  className="flex justify-between items-center px-3 py-1 rounded-lg shadow-lg  "
                                >
                                  <input
                                    type="checkbox"
                                    onChange={() =>
                                      handleCheckboxChange(item.name)
                                    }
                                    checked={selectedLogos.includes(item.name)}
                                  />
                                  <div className="text-sm md:text-[14px] py-1 px-3 rounded-md font-semibold capitalize">
                                      {item.name}
                                    </div>
                                  <img
                                  
                                    src={item.logo}
                                    alt={item.name}
                                    className="h-9 w-9 cursor-pointer"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Save !
                  </button>
                  {/* <button onClick={handleSave} className="mt-4 btn btn-primary fixed top-0 right-0">Save</button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TechnicalRecommendationModal;
// const TechnicalRecommendationModal = ({ isOpen, closeModal, }) => {
//   const theme = useSelector((state) => state.theme.theme);
//   const [selectedLogos, setSelectedLogos] = useState([]);
//   const [hoveredItemId, setHoveredItemId] = useState(null);
//   const handleCheckboxChange = (name) => {
//     setSelectedLogos((prevSelectedLogos) =>
//       prevSelectedLogos.includes(name)
//         ? prevSelectedLogos.filter((logoName) => logoName !== name)
//         : [...prevSelectedLogos, name]
//     );
//   };
//   const logos = [
//     {
//       category: "Programming Languages",
//       items: [
//         {
//           name: "JavaScript",
//           logo: javascriptLogo,
//         },
//         {
//           name: "c++",
//           logo: cLanguageLogo,
//         },
//         {
//           name: "CSharpe",
//           logo: csharpeLogo,
//         },
//         {
//           name: "Go",
//           logo: goLogo,
//         },
//         {
//           name: "Objective",
//           logo: objetiveLogo,
//         },
//         {
//           name: "Elixir",
//           logo: elixirLogo,
//         },
//         {
//           name: "rust",
//           logo: rustLogo,
//         },
//         {
//           name: "Clojure",
//           logo: clojureLogo,
//         },

//         {
//           name: "Haskell",
//           logo: haskellLogo,
//         },

//         { name: "Nim", logo: nimLogo },
//         {
//           name: "Erlang",
//           logo: erlangLogo,
//         },
//         {
//           name: "Python",
//           logo: pythonLogo,
//         },
//         {
//           name: "Scala",
//           logo: scalaLogo,
//         },
//         {
//           name: "Coffescript",
//           logo: coffeescriptLogo,
//         },
//         {
//           name: "Java Original",
//           logo: javaLogo,
//         },
//         {
//           name: "Typescript",
//           logo: tsLogo,
//         },
//       ],
//     },
//     {
//       category: "backendDevelopment",
//       items: [
//         {
//           name: "Solr",
//           logo: solrLogo,
//         },
//         {
//           name: "Graphql",
//           logo: graphqlLogo,
//         },
//         {
//           name: "Nodejs",
//           logo: nodejsLogo,
//         },
//         {
//           name: "Cloudflare",
//           logo: cloudflareLogo,
//         },
//         {
//           name: "Prisma",
//           logo: prismaLogo,
//         },
//         {
//           name: "Sanity",
//           logo: sanityLogo,
//         },
//         {
//           name: "Springio",
//           logo: springioLogo,
//         },

//         {
//           logo: openRestyLogo,
//           name: "openresty",
//         },
//         {
//           logo: kafkaLogo,
//           name: "kafka",
//         },
//         {
//           name: "Rabitmq",
//           logo: rabitmqLogo,
//         },

//         {
//           name: "Express",
//           logo: expressLogo,
//         },
//         {
//           name: "Hadoop",
//           logo: hadoopLogo,
//         },
//         {
//           name: "Ngrinx",
//           logo: ngrinxLogo,
//         },
//         {
//           name: "Nextjs",
//           logo: nextjsLogo,
//         },
//       ],
//     },
//     {
//       category: "frontendDevelopment",
//       items: [
//         {
//           name: "HTML",
//           logo: htmlLogo,
//         },
//         {
//           name: "Vue.Js",
//           logo: vueJsLogo,
//         },
//         {
//           name: "Materialize",
//           logo: materializeLogo,
//         },
//         {
//           name: "Tailwind",
//           logo: tailwindLogo,
//         },
//         {
//           name: "Swift",
//           logo: swiftLogo,
//         },
//         {
//           name: "Svelte",
//           logo: svelteLogo,
//         },
//         {
//           name: "React",
//           logo: reactLogo,
//         },
//         {
//           name: "WX Widgets",
//           logo: wxWidgetsLogo,
//         },
//         {
//           name: "Webpack", //er  vagrant scikiti
//           logo: webpackLogo,
//         },

//         {
//           name: "Babel",
//           logo: bubelLogo,
//         },
//         { name: "GTK", logo: gtkLogo },
//         {
//           name: "Vuetify",
//           logo: vuetifyLogo,
//         },
//         {
//           name: "Angular",
//           logo: angularLogo,
//         },
//         {
//           name: "Bootstrap",
//           logo: bootstrapLogo,
//         },
//         {
//           name: "Backbone.Js",
//           logo: backboeLogo,
//         },
//         {
//           name: "Bulma",
//           logo: bulmaLogo,
//         },

//         { name: "Pug", logo: pugLogo },

//         {
//           name: "Redux",
//           logo: reduxLogo,
//         },
//         {
//           name: "Sass",
//           logo: sassLogo,
//         },
//         {
//           name: "Gulp",
//           logo: gulpLogo,
//         },
//         { name: "QT", logo: qtLogo },

//         // {
//         //   id: 3,
//         //   logo: nodejsLogo,
//         //   name: "node",
//         // },
//         // {
//         //   id: 4,
//         //   logo: solrLogo,
//         //   name: "solr",
//         // },
//       ],
//     },

//     {
//       category: "Mobile App Development",
//       items: [
//         {
//           name: "Android",
//           logo: androidLogo,
//         },
//         {
//           name: "Flutterio",
//           logo: flutterioLogo,
//         },
//         {
//           name: "Dart",
//           logo: dartLogo,
//         },
//         {
//           name: "Iconic",
//           logo: iconicLogo,
//         },
//         {
//           name: "reactNative",
//           logo: reactNativeLogo,
//         },
//         {
//           name: "Xamarin",
//           logo: xamarinLogo,
//         },
//         {
//           name: "Native script",
//           logo: nativescriptLogo,
//         },
//         {
//           name: "Apache-Cordova",
//           logo: apacheLogo,
//         },
//       ],
//     },
//     {
//       category: "AI/ML",
//       items: [
//         {
//           name: "Tensor Flow",
//           logo: tensorFlowLogo,
//         },
//         {
//           name: "Pytorch",
//           logo: pytorchLogo,
//         },
//         {
//           name: "Pandas",
//           logo: pandasLogo,
//         },
//         {
//           name: "Oencv",
//           logo: opencvLogo,
//         },
//         {
//           name: "Scikit Learn",
//           logo: scikitLearnLogo,
//         },
//       ],
//     },
//     {
//       category: "Database",
//       items: [
//         {
//           name: "oracle",
//           logo: oracleLogo,
//         },
//         {
//           name: "postgresql",
//           logo: postgresqlLogo,
//         },
//         {
//           name: "radis",
//           logo: radisLogo,
//         },
//         {
//           name: "mssql",
//           logo: mssqlLogo,
//         },
//         {
//           name: "cockroachdb",
//           logo: cockroachdbLogo,
//         },
//         {
//           name: "hive",
//           logo: hiveLogo,
//         },
//         {
//           name: "Cassandra",
//           logo: cassandraLogo,
//         },
//         {
//           name: "mysql",
//           logo: mysqlLogo,
//         },
//         {
//           name: "mongodb",
//           logo: mongodbLogo,
//         },
//         {
//           name: "Couchdb",
//           logo: couchdbLogo,
//         },
//         {
//           name: "Realm",
//           logo: realmLogo,
//         },
//         {
//           name: "mariadb",
//           logo: mariadbLogo,
//         },
//         {
//           name: "Elastic Search",
//           logo: elasticSearchLogo,
//         },
//         {
//           name: "sqlite",
//           logo: sqliteLogo,
//         },
//       ],
//     },
//     {
//       category: "Data Visualization",
//       items: [
//         {
//           name: "d3js",
//           logo: d3jdLogo,
//         },
//         {
//           name: "Chartjs",
//           logo: chartjsLogo,
//         },
//         {
//           name: "Canvajs",
//           logo: canvajsLogo,
//         },
//         {
//           name: "kibana",
//           logo: kibanaLogo,
//         },
//         {
//           name: "Grafana",
//           logo: grafanaLogo,
//         },
//       ],
//     },
//     {
//       category: "Devops",
//       items: [
//         {
//           name: "aws",
//           logo: awsLogo,
//         },

//         {
//           name: "travisci",
//           logo: travisciLogo,
//         },
//         {
//           name: "Circleci",
//           logo: circleciLogo,
//         },
//         {
//           name: "Azure",
//           logo: azureLogo,
//         },

//         {
//           name: "bash",
//           logo: bashLogo,
//         },
//         {
//           name: "Kubernetes",
//           logo: kuberLogo,
//         },
//         {
//           name: "Gcp",
//           logo: gcpLogo,
//         },
//         {
//           name: "Jenkins",
//           logo: jenkinsLogo,
//         },
//         {
//           name: "Docker",
//           logo: dockerLogo,
//         },
//       ],
//     },
//     {
//       category: "Backend as a Service(BaaS)",
//       items: [
//         {
//           name: "Firebase",
//           logo: firebaseLogo,
//         },
//         {
//           name: "Amplify",
//           logo: amplifyLogo,
//         },
//         {
//           name: "appwrite",
//           logo: appwriteLogo,
//         },
//         {
//           name: "Heroku",
//           logo: herokuLogo,
//         },
//       ],
//     },
//     {
//       category: "Framework",
//       items: [
//         {
//           name: "django",
//           logo: djangoLogo,
//         },
//         {
//           name: "laravelo",
//           logo: laravelLogo,
//         },
//         {
//           name: "dotnet",
//           logo: dotnetLogo,
//         },
//         {
//           name: "codeigniter",
//           logo: codeigniterLogo,
//         },
//         {
//           name: "quasar",
//           logo: quasarLogo,
//         },

//         {
//           name: "Flask",
//           logo: flaskLogo,
//         },
//         {
//           name: "rails",
//           logo: railsLogo,
//         },
//         {
//           name: "symfony",
//           logo: symfonyLogo,
//         },
//         {
//           name: "electron",
//           logo: electronLogo,
//         },
//       ],
//     },
//     {
//       category: "Testing",
//       items: [
//         {
//           name: "cypress",
//           logo: cypressLogo,
//         },
//         {
//           name: "Puppeteer",
//           logo: puppeteerLogo,
//         },
//         {
//           name: "Karma",
//           logo: karmaLogo,
//         },
//         {
//           name: "selenium",
//           logo: seleniumLogo,
//         },
//         {
//           name: "Jasmine",
//           logo: jasmineLogo,
//         },
//         {
//           name: "jest",
//           logo: jestLogo,
//         },
//         {
//           name: "mocha",
//           logo: mochaLogo,
//         },
//       ],
//     },
//     {
//       category: "Software",
//       items: [
//         {
//           name: "illustrator",
//           logo: illustratorLogo,
//         },
//         {
//           name: "photoshop",
//           logo: photoshopLogo,
//         },
//         {
//           name: "blender",
//           logo: blenderLogo,
//         },
//         {
//           name: "matlab",
//           logo: matlabLogo,
//         },
//         {
//           name: "Postman",
//           logo: postmanLogo,
//         },
//         { name: "XD", logo: xdLogo },
//         {
//           name: "Figma",
//           logo: figmaLogo,
//         },
//         {
//           name: "sketch",
//           logo: sketchLogo,
//         },
//         {
//           name: "framer",
//           logo: framerLogo,
//         },
//       ],
//     },
//     {
//       category: "Static Site Generators",
//       items: [
//         {
//           name: "gatsby",
//           logo: gatsbyLogo,
//         },
//         {
//           name: "gridsomeo",
//           logo: gridsomeLogo,
//         },
//         {
//           name: "hugo",
//           logo: hugoLogo,
//         },
//         {
//           name: "Nuxt.js",
//           logo: nuxtjsLogo,
//         },
//         {
//           name: "11ty",
//           logo: eleventyLogo,
//         },
//         {
//           name: "sculpin",
//           logo: sculpinLogo,
//         },
//         {
//           name: "Vue press",
//           logo: veupressLogo,
//         },
//         { name: "h", logo: hexoLogo },
//         {
//           name: "Middleman",
//           logo: middlemanLogo,
//         },
//         {
//           name: "jeky11",
//           logo: jeky11Logo,
//         },
//         {
//           name: "scully",
//           logo: scllyLogo,
//         },
//       ],
//     },
//     {
//       category: "Game Engines",
//       items: [
//         {
//           name: "unity",
//           logo: unityLogo,
//         },
//         {
//           name: "unreal",
//           logo: unrealLogo,
//         },
//       ],
//     },
//     {
//       category: "Automation",
//       items: [
//         {
//           name: "zapier",
//           logo: zapierLogo,
//         },
//         {
//           name: "ifttt",
//           logo: iftttLogo,
//         },
//       ],
//     },
//     {
//       category: "Other",
//       items: [
//         {
//           name: "linux",
//           logo: linuxLogo,
//         },
//         { name: "git", logo: gitLogo },

//         {
//           name: "arduino",
//           logo: arduinoLogo,
//         },
//       ],
//     },
//   ];
//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="relative z-10" onClose={closeModal}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full lg:w-9/12 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                 <div className=" px-[3px] rounded-m bg-white">
//                   <div className=" w-full py-5">
//                     <div className="flex flex-col justify-center items-center">
//                       <p className="py-5 text-xl font-semibold">
//                         Selected Technologies: {selectedLogos.join(", ")}
//                       </p>
//                       <div className="w-full px-3">
//                         {logos.map((category) => (
//                           <div key={category.category} className="py-7">
//                             <p className="py-4 text-lg font-semibold capitalize">
//                               {category.category
//                                 .replace(/([A-Z])/g, " $1")
//                                 .trim()}
//                             </p>
//                             <div className="grid grid-cols-4 gap-8">
//                               {category.items.map((item) => (
//                                 <div
//                                   key={item.name}
//                                   className="flex items-center space-x-5"
//                                 >
//                                   <input
//                                     type="checkbox"
//                                     onChange={() =>
//                                       handleCheckboxChange(item.name)
//                                     }
//                                     checked={selectedLogos.includes(item.name)}
//                                   />
//                                   <img
//                                     onMouseEnter={() =>
//                                       setHoveredItemId(item.name)
//                                     }
//                                     onMouseLeave={() => setHoveredItemId(null)}
//                                     src={item.logo}
//                                     alt={item.name}
//                                     className="h-9 w-9 cursor-pointer"
//                                   />
//                                   {hoveredItemId === item.name && (
//                                     <div className="bg-gray-900 py-1 px-3 rounded-md text-white font-semibold capitalize">
//                                       {item.name}
//                                     </div>
//                                   )}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-4">
//                   <button
//                     type="button"
//                     className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                     onClick={closeModal}
//                   >
//                     Save !
//                   </button>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default TechnicalRecommendationModal;
